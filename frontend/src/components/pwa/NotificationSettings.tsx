import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  isPushNotificationSupported,
  getNotificationPermission,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isSubscribedToPush,
  sendTestNotification,
} from '@/utils/pushNotifications';

export function NotificationSettings() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    const supported = isPushNotificationSupported();
    setIsSupported(supported);

    if (supported) {
      const perm = getNotificationPermission();
      setPermission(perm);

      const subscribed = await isSubscribedToPush();
      setIsSubscribed(subscribed);
    }
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    setIsLoading(true);

    try {
      if (enabled) {
        const subscription = await subscribeToPushNotifications();

        if (subscription) {
          setIsSubscribed(true);
          setPermission('granted');
          toast({
            title: 'Notificações ativadas',
            description: 'Você receberá notificações sobre novos insights e desafios.',
          });

          // Send test notification
          await sendTestNotification();
        } else {
          toast({
            title: 'Erro ao ativar notificações',
            description: 'Não foi possível ativar as notificações. Verifique as permissões do navegador.',
            variant: 'destructive',
          });
        }
      } else {
        const success = await unsubscribeFromPushNotifications();

        if (success) {
          setIsSubscribed(false);
          toast({
            title: 'Notificações desativadas',
            description: 'Você não receberá mais notificações.',
          });
        } else {
          toast({
            title: 'Erro ao desativar notificações',
            description: 'Não foi possível desativar as notificações.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('[Notifications] Error toggling:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao processar sua solicitação.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();
      toast({
        title: 'Notificação de teste enviada',
        description: 'Você deve ter recebido uma notificação de teste.',
      });
    } catch (error) {
      console.error('[Notifications] Error sending test:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a notificação de teste.',
        variant: 'destructive',
      });
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notificações não suportadas
          </CardTitle>
          <CardDescription>
            Seu navegador não suporta notificações push. Tente usar um navegador moderno como Chrome, Firefox ou Edge.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificações Push
        </CardTitle>
        <CardDescription>
          Receba notificações sobre novos insights diários, desafios semanais e conquistas desbloqueadas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications-toggle" className="flex flex-col gap-1">
            <span className="font-medium">Ativar notificações</span>
            <span className="text-sm text-muted-foreground font-normal">
              {permission === 'granted' && isSubscribed
                ? 'Notificações ativadas'
                : permission === 'denied'
                ? 'Permissão negada - ajuste nas configurações do navegador'
                : 'Você não receberá notificações'}
            </span>
          </Label>
          <Switch
            id="notifications-toggle"
            checked={isSubscribed && permission === 'granted'}
            onCheckedChange={handleToggleNotifications}
            disabled={isLoading || permission === 'denied'}
          />
        </div>

        {isSubscribed && permission === 'granted' && (
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleTestNotification}
              className="w-full"
            >
              <Bell className="w-4 h-4 mr-2" />
              Enviar notificação de teste
            </Button>
          </div>
        )}

        {permission === 'denied' && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            <p className="font-medium mb-1">Permissão negada</p>
            <p className="text-xs">
              Para ativar notificações, você precisa permitir nas configurações do seu navegador.
            </p>
          </div>
        )}

        <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Tipos de notificações:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Insight diário personalizado</li>
            <li>Novo desafio semanal disponível</li>
            <li>Conquistas desbloqueadas</li>
            <li>Lembretes de diário de reflexão</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
