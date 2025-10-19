import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { useJournal } from "@/hooks/useAPI";
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
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("");

  // Use API hook for journal operations
  const {
    entries,
    loading,
    error,
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry
  } = useJournal();

  // Auth management (still using Supabase Auth)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      // Load entries using API hook
      getEntries(1, 50);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        // Reload entries on auth change
        getEntries(1, 50);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Removed getEntries from deps to prevent infinite loop

  const handleSave = async () => {
    if (!user || !content.trim()) {
      toast.error("Escreva algo antes de salvar");
      return;
    }

    try {
      if (editingId) {
        // Update existing entry
        await updateEntry(editingId, content.trim(), mood || undefined, undefined);
        toast.success("Entrada atualizada!");
      } else {
        // Create new entry (+10 XP from backend)
        await createEntry(content.trim(), mood || undefined, undefined);
        toast.success("Entrada salva com sucesso! +10 XP");
      }
      // Reload entries
      await getEntries(1, 50);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar entrada");
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

    try {
      await deleteEntry(id);
      toast.success("Entrada excluída");
      // deleteEntry hook already reloads entries
    } catch (err: any) {
      toast.error(err.message || "Erro ao excluir entrada");
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

  if (loading && entries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  // Show error toast if API error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
