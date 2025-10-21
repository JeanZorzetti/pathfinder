import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Brain, BookOpen, Info, LogOut, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MobileNavDrawerProps {
  isAuthenticated: boolean;
  onLogout?: () => void;
}

interface NavLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  requireAuth?: boolean;
}

const navLinks: NavLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    requireAuth: true,
  },
  {
    label: "Guia MBTI",
    path: "/mbti",
    icon: Brain,
  },
  {
    label: "Blog",
    path: "/blog",
    icon: BookOpen,
  },
  {
    label: "Sobre",
    path: "/about",
    icon: Info,
  },
];

export const MobileNavDrawer = ({ isAuthenticated, onLogout }: MobileNavDrawerProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="gradient-text font-bold text-lg">Pathfinder</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            // Hide auth-required links if not authenticated
            if (link.requireAuth && !isAuthenticated) return null;

            const Icon = link.icon;

            return (
              <Button
                key={link.path}
                variant="ghost"
                className={cn(
                  "justify-start gap-3 h-12 px-4",
                  "hover:bg-primary/10 transition-colors"
                )}
                onClick={() => handleNavigate(link.path)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-base">{link.label}</span>
              </Button>
            );
          })}

          <Separator className="my-4" />

          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="justify-start gap-3 h-12 px-4 text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="text-base">Sair</span>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="justify-start gap-3 h-12 px-4"
                onClick={() => handleNavigate("/auth")}
              >
                <span className="text-base">Entrar</span>
              </Button>
              <Button
                variant="hero"
                className="mt-2"
                onClick={() => handleNavigate("/auth")}
              >
                Começar Grátis
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
