import { cn } from "@/lib/utils";

export type LikertValue = -3 | -2 | -1 | 0 | 1 | 2 | 3 | null;

interface LikertScaleProps {
  value: LikertValue;
  onChange: (value: Exclude<LikertValue, null>) => void;
  className?: string;
}

const LikertScale = ({ value, onChange, className }: LikertScaleProps) => {
  const options: Array<{ value: Exclude<LikertValue, null>; label: string; color: string }> = [
    { value: 3, label: 'Concordo Totalmente', color: 'bg-green-600 hover:bg-green-700' },
    { value: 2, label: 'Concordo', color: 'bg-green-500 hover:bg-green-600' },
    { value: 1, label: 'Concordo Parcialmente', color: 'bg-green-400 hover:bg-green-500' },
    { value: 0, label: 'Neutro', color: 'bg-gray-400 hover:bg-gray-500' },
    { value: -1, label: 'Discordo Parcialmente', color: 'bg-purple-400 hover:bg-purple-500' },
    { value: -2, label: 'Discordo', color: 'bg-purple-500 hover:bg-purple-600' },
    { value: -3, label: 'Discordo Totalmente', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Labels */}
      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground px-2">
        <span className="text-green-600">Concordo</span>
        <span className="text-purple-600">Discordo</span>
      </div>

      {/* Circles */}
      <div className="flex justify-between items-center gap-2 sm:gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "active:scale-95",
              value === option.value
                ? `${option.color} border-transparent shadow-lg scale-110`
                : "bg-gray-100 border-gray-300 hover:border-gray-400 hover:scale-105"
            )}
            aria-label={option.label}
            title={option.label}
          >
            {value === option.value && (
              <span className="text-white font-bold text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Value labels */}
      <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
        <span>+3</span>
        <span>+2</span>
        <span>+1</span>
        <span>0</span>
        <span>-1</span>
        <span>-2</span>
        <span>-3</span>
      </div>

      {/* Selected label */}
      {value !== null && (
        <div className="text-center text-sm font-medium text-primary animate-in fade-in duration-200">
          {options.find(opt => opt.value === value)?.label}
        </div>
      )}
    </div>
  );
};

export default LikertScale;
