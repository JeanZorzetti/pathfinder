import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BookOpen, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface JournalEntry {
  id: string;
  content: string;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

const Journal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadEntries(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadEntries = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }) as { data: JournalEntry[] | null, error: any };

    if (error) {
      toast.error("Erro ao carregar entradas");
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user || !content.trim()) {
      toast.error("Escreva algo antes de salvar");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("journal_entries")
        .update({ content: content.trim(), mood: mood || null })
        .eq("id", editingId);

      if (error) {
        toast.error("Erro ao atualizar entrada");
      } else {
        toast.success("Entrada atualizada!");
        loadEntries(user.id);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user.id,
        content: content.trim(),
        mood: mood || null,
      });

      if (error) {
        toast.error("Erro ao salvar entrada");
      } else {
        toast.success("Entrada salva com sucesso!");
        loadEntries(user.id);
        resetForm();
      }
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setContent(entry.content);
    setMood(entry.mood || "");
    setIsWriting(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta entrada?")) return;

    const { error } = await supabase.from("journal_entries").delete().eq("id", id);

    if (error) {
      toast.error("Erro ao excluir entrada");
    } else {
      toast.success("Entrada excluída");
      if (user) loadEntries(user.id);
    }
  };

  const resetForm = () => {
    setContent("");
    setMood("");
    setIsWriting(false);
    setEditingId(null);
  };

  const getMoodEmoji = (mood: string | null) => {
    const moods: Record<string, string> = {
      feliz: "😊",
      triste: "😢",
      ansioso: "😰",
      calmo: "😌",
      energizado: "⚡",
      reflexivo: "🤔",
    };
    return mood ? moods[mood] || "📝" : "📝";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              ← Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">Meu Diário</span>
            </div>
          </div>
          {!isWriting && (
            <Button onClick={() => setIsWriting(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Entrada
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {isWriting && (
          <Card className="mb-8 shadow-elegant">
            <CardHeader>
              <CardTitle>{editingId ? "Editar Entrada" : "Nova Entrada"}</CardTitle>
              <CardDescription>
                Registre seus pensamentos, emoções e reflexões do dia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Como você está se sentindo?</label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um humor (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feliz">😊 Feliz</SelectItem>
                    <SelectItem value="triste">😢 Triste</SelectItem>
                    <SelectItem value="ansioso">😰 Ansioso</SelectItem>
                    <SelectItem value="calmo">😌 Calmo</SelectItem>
                    <SelectItem value="energizado">⚡ Energizado</SelectItem>
                    <SelectItem value="reflexivo">🤔 Reflexivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sua Reflexão</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="O que está em sua mente hoje? Escreva livremente..."
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={!content.trim()}>
                  Salvar
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {entries.length === 0 && !isWriting && (
          <Card className="shadow-sm">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Seu diário está vazio</h3>
              <p className="text-muted-foreground mb-6">
                Comece sua jornada de autoconhecimento registrando sua primeira reflexão
              </p>
              <Button onClick={() => setIsWriting(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Escrever Primeira Entrada
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="shadow-sm hover:shadow-elegant transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <CardTitle className="text-base">
                        {format(new Date(entry.created_at), "EEEE, d 'de' MMMM", { locale: ptBR })}
                      </CardTitle>
                      <CardDescription>
                        {format(new Date(entry.created_at), "HH:mm")}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Journal;
