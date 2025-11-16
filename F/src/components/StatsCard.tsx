import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "accent" | "warning";
}

export function StatsCard({ title, value, icon: Icon, trend, variant = "default" }: StatsCardProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/10 border-primary/20",
    accent: "bg-accent/10 border-accent/20",
    warning: "bg-warning/10 border-warning/20",
  };

  const iconStyles = {
    default: "text-primary",
    primary: "text-primary",
    accent: "text-accent",
    warning: "text-warning",
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            variant === "default" ? "bg-primary/10" : "bg-background/50"
          )}>
            <Icon className={cn("h-6 w-6", iconStyles[variant])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
