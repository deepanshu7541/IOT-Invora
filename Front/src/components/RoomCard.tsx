import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCoolingSystem } from "@/contexts/CoolingSystemContext";

interface RoomCardProps {
  name: string;
  type: "operation" | "blood-bank";
  threshold: number;
}

export function RoomCard({ name, type, threshold }: RoomCardProps) {
  const { manualOverride } = useCoolingSystem();
  const [temperature, setTemperature] = useState(0);
  const [isAlert, setIsAlert] = useState(false);
  const [coolingActive, setCoolingActive] = useState(false);

  useEffect(() => {
    // Generate random temperature based on room type
    const generateTemp = () => {
      const baseTemp = type === "operation" ? 22 : 4;
      const variance = type === "operation" ? 6 : 3;
      const newTemp = baseTemp + (Math.random() * variance * 2 - variance);
      const roundedTemp = Math.round(newTemp * 10) / 10;
      
      setTemperature(roundedTemp);
      const alertCondition = type === "operation" 
        ? roundedTemp > threshold || roundedTemp < 18
        : roundedTemp > threshold || roundedTemp < 2;
      
      setIsAlert(alertCondition);
      setCoolingActive(alertCondition && manualOverride);
    };

    generateTemp();
    const interval = setInterval(generateTemp, 5000);
    return () => clearInterval(interval);
  }, [type, threshold, manualOverride]);

  const getStatusColor = () => {
    if (isAlert) return "text-destructive";
    if (type === "operation" && (temperature < 20 || temperature > 24)) {
      return "text-warning";
    }
    if (type === "blood-bank" && (temperature < 2.5 || temperature > 5)) {
      return "text-warning";
    }
    return "text-accent";
  };

  const getStatusText = () => {
    if (isAlert) return "Critical";
    if (type === "operation" && (temperature < 20 || temperature > 24)) {
      return "Warning";
    }
    if (type === "blood-bank" && (temperature < 2.5 || temperature > 5)) {
      return "Warning";
    }
    return "Normal";
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      isAlert && "border-destructive shadow-lg shadow-destructive/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <Badge
            variant={isAlert ? "destructive" : "secondary"}
            className={cn(
              "flex items-center gap-1",
              !isAlert && getStatusColor()
            )}
          >
            {isAlert && <AlertTriangle className="h-3 w-3" />}
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full",
            isAlert ? "bg-destructive/10" : "bg-primary/10"
          )}>
            <Thermometer className={cn(
              "h-8 w-8",
              isAlert ? "text-destructive" : "text-primary"
            )} />
          </div>
          <div>
            <div className={cn(
              "text-3xl font-bold",
              getStatusColor()
            )}>
              {temperature}°C
            </div>
            <p className="text-sm text-muted-foreground">
              Threshold: {threshold}°C
            </p>
          </div>
        </div>
        {isAlert && (
          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm font-medium text-destructive">
                Temperature exceeds safe limits! Immediate attention required.
              </p>
            </div>
            {coolingActive && (
              <div className="rounded-md bg-primary/10 p-3">
                <p className="text-sm font-medium text-primary">
                  🧊 Cooling System Activated
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
