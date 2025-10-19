import { Loader2, ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PullToRefreshIndicatorProps {
  pullY: number;
  isRefreshing: boolean;
  shouldTrigger: boolean;
}

export const PullToRefreshIndicator = ({
  pullY,
  isRefreshing,
  shouldTrigger,
}: PullToRefreshIndicatorProps) => {
  // Don't show if not pulling
  if (pullY === 0 && !isRefreshing) return null;

  // Calculate opacity and scale based on pull distance
  const opacity = Math.min(pullY / 40, 1);
  const scale = Math.min(pullY / 60, 1);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none"
      style={{
        transform: `translateY(${Math.min(pullY, 80)}px)`,
        transition: isRefreshing || pullY === 0 ? "transform 0.3s ease-out" : "none",
      }}
    >
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-full shadow-lg p-3",
          "flex items-center justify-center",
          "transition-all duration-200"
        )}
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {isRefreshing ? (
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        ) : shouldTrigger ? (
          <Check className="w-6 h-6 text-green-500" />
        ) : (
          <ArrowDown
            className={cn(
              "w-6 h-6 text-gray-400 transition-transform duration-200",
              pullY > 40 && "text-primary"
            )}
            style={{
              transform: `rotate(${Math.min(pullY * 2, 180)}deg)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
