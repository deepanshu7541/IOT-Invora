import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Thermometer, Clock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCoolingSystem } from "@/contexts/CoolingSystemContext";

interface Organ {
  id: number;
  name: string;
  type: string;
  age: number;
  temperature: number;
  threshold: number;
  criticality: "Low" | "Medium" | "High" | "Critical";
  coolingActive: boolean;
}

const initialOrgans: Omit<Organ, "temperature" | "coolingActive">[] = [
  { id: 1, name: "Heart #A-001", type: "Heart", age: 4, threshold: 6, criticality: "High" },
  { id: 2, name: "Kidney #K-023", type: "Kidney", age: 6, threshold: 6, criticality: "Medium" },
  { id: 3, name: "Liver #L-015", type: "Liver", age: 3, threshold: 6, criticality: "High" },
  { id: 4, name: "Lung #LU-008", type: "Lung", age: 5, threshold: 6, criticality: "Critical" },
  { id: 5, name: "Kidney #K-024", type: "Kidney", age: 2, threshold: 6, criticality: "Low" },
  { id: 6, name: "Heart #A-002", type: "Heart", age: 7, threshold: 6, criticality: "Critical" },
  { id: 7, name: "Liver #L-016", type: "Liver", age: 4, threshold: 6, criticality: "Medium" },
  { id: 8, name: "Pancreas #P-004", type: "Pancreas", age: 3, threshold: 6, criticality: "High" },
];

const OrganRoom = () => {
  const { toast } = useToast();
  const { manualOverride } = useCoolingSystem();
  const [organs, setOrgans] = useState<Organ[]>(
    initialOrgans.map((organ) => ({
      ...organ,
      temperature: parseFloat((Math.random() * 10 + 1).toFixed(1)),
      coolingActive: false,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setOrgans((prev) =>
        prev.map((organ) => {
          const newTemp = parseFloat((Math.random() * 10 + 1).toFixed(1));
          const previousTemp = organ.temperature;
          const isCritical = newTemp > organ.threshold || newTemp < 2;

          if (
            isCritical &&
            (previousTemp <= organ.threshold && previousTemp >= 2)
          ) {
            toast({
              variant: "destructive",
              title: `Temperature Alert - ${organ.name}`,
              description: `Temperature is ${newTemp}°C. Safe range: 2-${organ.threshold}°C`,
            });
          }

          return { ...organ, temperature: newTemp, coolingActive: isCritical && manualOverride };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [toast, manualOverride]);

  const getTemperatureStatus = (temp: number, threshold: number) => {
    if (temp > threshold || temp < 2) return "critical";
    if (temp > threshold - 1 || temp < 3) return "warning";
    return "normal";
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      case "Low":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Organ Storage</h1>
        {/* <p className="text-muted-foreground">
          Monitor organ inventory, age, temperature, and criticality status
        </p> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organs.map((organ) => {
          const status = getTemperatureStatus(organ.temperature, organ.threshold);
          return (
            <Card
              key={organ.id}
              className={cn(
                "transition-all",
                status === "critical" && "border-destructive shadow-md shadow-destructive/20",
                status === "warning" && "border-yellow-500/50"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg",
                      status === "critical" ? "bg-destructive/10" : "bg-primary/10"
                    )}>
                      <Heart className={cn(
                        "h-6 w-6",
                        status === "critical" ? "text-destructive" : "text-primary"
                      )} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{organ.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{organ.type}</p>
                    </div>
                  </div>
                  <Badge className={getCriticalityColor(organ.criticality)}>
                    {organ.criticality}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-md bg-secondary p-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Age</span>
                  </div>
                  <span className="font-semibold text-foreground">{organ.age} hours</span>
                </div>

                <div className={cn(
                  "flex items-center justify-between rounded-md p-2",
                  status === "critical" ? "bg-destructive/10" : "bg-secondary"
                )}>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Temperature</span>
                  </div>
                  <span
                    className={cn(
                      "font-bold",
                      status === "critical" && "text-destructive",
                      status === "warning" && "text-yellow-600",
                      status === "normal" && "text-accent"
                    )}
                  >
                    {organ.temperature}°C
                  </span>
                </div>

                {status !== "normal" && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                      <p className="text-xs text-destructive">
                        Temperature outside safe range (2-{organ.threshold}°C)
                      </p>
                    </div>
                    {organ.coolingActive && (
                      <div className="rounded-md bg-primary/10 p-2">
                        <p className="text-xs font-medium text-primary">
                          🧊 Cooling System Activated
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrganRoom;
