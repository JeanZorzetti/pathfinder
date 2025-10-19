import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { handleUpdate } from '@/utils/serviceWorkerRegistration';

export function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleSWUpdate = () => {
      setShowUpdatePrompt(true);
    };

    window.addEventListener('sw-update-available', handleSWUpdate);

    return () => {
      window.removeEventListener('sw-update-available', handleSWUpdate);
    };
  }, []);

  const handleUpdateClick = () => {
    setIsUpdating(true);
    handleUpdate();
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-top-5">
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20 shadow-xl">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Atualização Disponível</h3>
                <p className="text-xs text-muted-foreground">
                  Uma nova versão do Pathfinder está pronta
                </p>
              </div>
            </div>
            {!isUpdating && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mt-1 -mr-1"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Atualize agora para ter acesso às últimas funcionalidades e melhorias.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdateClick}
                className="flex-1"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar Agora
                  </>
                )}
              </Button>
              {!isUpdating && (
                <Button onClick={handleDismiss} variant="outline">
                  Depois
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
