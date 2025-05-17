import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { icons, Loader2 } from "lucide-react";

interface QuickActionButtonProps {
  iconName: keyof typeof icons;
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export function QuickActionButton({
  iconName,
  label,
  onClick,
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  className,
  children,
}: Readonly<QuickActionButtonProps>) {
  const Icon = icons[iconName] ?? Loader2;

  const sizeStyles = {
    sm: "h-[60px] px-4 gap-2 text-xs",
    md: "h-[80px] p-2 md:px-6 gap-3 text-sm",
    lg: "h-[100px] px-8 gap-4 text-base",
  } as const;

  const variantStyles = {
    default: "border-border bg-muted hover:bg-muted/50 hover:border-primary/50",
    primary:
      "border-primary/20 bg-primary/10 hover:bg-primary/20 hover:border-primary",
    secondary:
      "border-secondary/20 bg-secondary/10 hover:bg-secondary/20 hover:border-secondary",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md shadow-sm",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <Button
        variant="outline"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "flex w-full flex-col items-start justify-center",
          "relative z-10 transition-all duration-300",
          "focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "aria-disabled::opacity-50",
          sizeStyles[size],
          variantStyles[variant],
          !disabled &&
            !loading &&
            "hover:bg-gradient-to-r hover:from-muted/50 hover:to-transparent",
        )}
        aria-label={label}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Icon
            className={cn(
              size === "sm" && "w-3 h-3",
              size === "md" && "w-4 h-4",
              size === "lg" && "w-5 h-5",
            )}
          />
        )}
        {children}
      </Button>
    </div>
  );
}
