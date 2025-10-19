import { useNavigate, useLocation } from "react-router-dom";
import { Home, Brain, BookOpen, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  matchPaths?: string[]; // Additional paths that should highlight this nav item
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: "Início",
    path: "/",
  },
  {
    icon: Brain,
    label: "Testes",
    path: "/test/mbti",
    matchPaths: ["/test/bigfive", "/test/enneagram", "/mbti"],
  },
  {
    icon: BookOpen,
    label: "Diário",
    path: "/journal",
  },
  {
    icon: Calendar,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: User,
    label: "Perfil",
    path: "/about",
    matchPaths: ["/premium", "/blog"],
  },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    if (item.matchPaths?.some((path) => location.pathname.startsWith(path))) {
      return true;
    }
    return false;
  };

  // Don't show on auth page or test pages (full screen experience)
  const hideOnPaths = ["/auth", "/test/mbti", "/test/bigfive", "/test/enneagram"];
  if (hideOnPaths.some((path) => location.pathname === path)) {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation - Only visible on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 px-3 py-2 rounded-lg transition-all duration-200",
                  "active:scale-95", // Tap feedback
                  active
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                )}
                aria-label={item.label}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 mb-1 transition-transform duration-200",
                    active && "scale-110"
                  )}
                />
                <span className={cn(
                  "text-xs font-medium transition-all duration-200",
                  active && "font-semibold"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
