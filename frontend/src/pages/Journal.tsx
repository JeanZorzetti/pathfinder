import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { useJournal } from "@/hooks/useAPI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BookOpen, Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-save function (debounced)
  const autoSave = useCallback(async (text: string, currentMood: string, currentEditingId: string | null) => {
    if (!user || text.trim().length < 10) return;

    setIsSaving(true);
    try {
      if (currentEditingId) {
        await updateEntry(currentEditingId, text.trim(), currentMood || undefined, undefined);
      } else {
        const result = await createEntry(text.trim(), currentMood || undefined, undefined);
        // Set editing ID so subsequent auto-saves update instead of create
        if (result?.id) {
          setEditingId(result.id);
        }
      }
      setLastSaved(new Date());
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      setIsSaving(false);
    }
  }, [user, createEntry, updateEntry]);

  // Debounced auto-save on content change
  useEffect(() => {
    if (isWriting && content.trim().length >= 10) {
      // Clear existing timer
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }

      // Set new timer (3 seconds)
      autoSaveTimerRef.current = setTimeout(() => {
        autoSave(content, mood, editingId);
      }, 3000);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [content, mood, editingId, isWriting, autoSave]);

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

    // Validate minimum length
    if (content.trim().length < 10) {
      toast.error("A entrada deve ter pelo menos 10 caracteres");
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

  // Note: Removed useEffect for error toast to prevent re-render loops
  // Errors are now shown inline in try/catch blocks

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="hidden sm:flex">
              ← Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="sm:hidden">
              ←
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="font-bold text-base sm:text-lg">Meu Diário</span>
            </div>
          </div>
          {!isWriting && (
            <Button onClick={() => setIsWriting(true)} size="sm" className="min-h-[44px]">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nova Entrada</span>
            </Button>
          )}
        </div>
      </header>

      <main className={cn(
        "container mx-auto px-4 py-4 sm:py-8 max-w-4xl",
        isWriting && "pb-32 sm:pb-8" // Extra padding when writing (for fixed buttons)
      )}>
        {isWriting && (
          <>
            <Card className="mb-4 sm:mb-8 shadow-elegant">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">{editingId ? "Editar Entrada" : "Nova Entrada"}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Registre seus pensamentos, emoções e reflexões do dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-2 block">Como você está se sentindo?</label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger className="min-h-[44px]">
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-medium">
                      Sua Reflexão
                    </label>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs",
                        content.trim().length < 10 ? "text-muted-foreground" : "text-green-600"
                      )}>
                        {content.trim().length}/10 mín.
                      </span>
                      {isSaving && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Save className="w-3 h-3 animate-pulse" />
                          Salvando...
                        </span>
                      )}
                      {lastSaved && !isSaving && (
                        <span className="text-xs text-green-600">
                          ✓ Salvo
                        </span>
                      )}
                    </div>
                  </div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="O que está em sua mente hoje? Escreva livremente... (mínimo 10 caracteres)"
                    className="min-h-[300px] sm:min-h-[200px] resize-none text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💾 Salvamento automático ativado (3s após parar de digitar)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sticky buttons on mobile, normal on desktop */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-sm border-t sm:relative sm:bottom-auto sm:p-0 sm:bg-transparent sm:border-0 z-20">
              <div className="container max-w-4xl mx-auto flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={content.trim().length < 10}
                  title={content.trim().length < 10 ? "Digite pelo menos 10 caracteres" : "Salvar entrada"}
                  className="flex-1 sm:flex-initial min-h-[44px]"
                >
                  <Save className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Salvar</span>
                  <span className="sm:hidden">Salvar {content.trim().length < 10 && `(${10 - content.trim().length})`}</span>
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1 sm:flex-initial min-h-[44px]">
                  Cancelar
                </Button>
              </div>
            </div>
          </>
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

        <div className="space-y-3 sm:space-y-4">
          {entries.map((entry) => {
            // Safely parse date with fallback
            const entryDate = entry.created_at ? new Date(entry.created_at) : new Date();
            const isValidDate = !isNaN(entryDate.getTime());

            return (
              <Card key={entry.id} className="shadow-sm hover:shadow-elegant transition-smooth">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{getMoodEmoji(entry.mood)}</span>
                      <div className="min-w-0">
                        <CardTitle className="text-sm sm:text-base truncate">
                          {isValidDate
                            ? format(entryDate, "EEEE, d 'de' MMMM", { locale: ptBR })
                            : "Data inválida"
                          }
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {isValidDate ? format(entryDate, "HH:mm") : "--:--"}
                        </CardDescription>
                      </div>
                    </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(entry)}
                      className="min-h-[44px] min-w-[44px]"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="min-h-[44px] min-w-[44px]"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{entry.content}</p>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Journal;
