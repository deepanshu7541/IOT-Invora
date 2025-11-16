import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplet, Thermometer, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCoolingSystem } from "@/contexts/CoolingSystemContext";

const bloodUnits = [
  { type: "A+", units: 45, threshold: 6 },
  { type: "A-", units: 23, threshold: 6 },
  { type: "B+", units: 38, threshold: 6 },
  { type: "B-", units: 15, threshold: 6 },
  { type: "AB+", units: 12, threshold: 6 },
  { type: "AB-", units: 8, threshold: 6 },
  { type: "O+", units: 67, threshold: 6 },
  { type: "O-", units: 34, threshold: 6 },
];

const BloodBank = () => {
  const { toast } = useToast();
  const { manualOverride } = useCoolingSystem();
  const [bloodInventory, setBloodInventory] = useState(
    bloodUnits.map((unit) => ({
      ...unit,
      temperature: parseFloat((Math.random() * 10 + 1).toFixed(1)),
      coolingActive: false,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBloodInventory((prev) =>
        prev.map((item) => {
          const newTemp = parseFloat((Math.random() * 10 + 1).toFixed(1));
          const previousTemp = item.temperature;
          const isCritical = newTemp > item.threshold || newTemp < 2;

          if (
            isCritical &&
            (previousTemp <= item.threshold && previousTemp >= 2)
          ) {
            toast({
              variant: "destructive",
              title: `Temperature Alert - ${item.type}`,
              description: `Temperature is ${newTemp}°C (Threshold: 2-${item.threshold}°C)`,
            });
          }

          return { ...item, temperature: newTemp, coolingActive: isCritical && manualOverride };
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

  const handleAddBlood = (bloodType: string) => {
    setBloodInventory((prev) =>
      prev.map((item) =>
        item.type === bloodType ? { ...item, units: item.units + 1 } : item
      )
    );
    toast({
      title: "Blood Added",
      description: `Added 1 unit of ${bloodType} blood`,
    });
  };

  const handleRemoveBlood = (bloodType: string) => {
    setBloodInventory((prev) =>
      prev.map((item) =>
        item.type === bloodType && item.units > 0
          ? { ...item, units: item.units - 1 }
          : item
      )
    );
    toast({
      title: "Blood Used",
      description: `Removed 1 unit of ${bloodType} blood`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Blood Bank</h1>
        <p className="text-muted-foreground">
          Monitor blood inventory and storage temperature
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {bloodInventory.map((blood) => {
          const status = getTemperatureStatus(blood.temperature, blood.threshold);
          return (
            <Card
              key={blood.type}
              className={`transition-all ${
                status === "critical"
                  ? "border-destructive shadow-md"
                  : status === "warning"
                  ? "border-yellow-500/50"
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                      <Droplet className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{blood.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">{blood.units} units</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      blood.units < 20
                        ? "destructive"
                        : blood.units < 40
                        ? "secondary"
                        : "default"
                    }
                  >
                    {blood.units < 20 ? "Low" : blood.units < 40 ? "Medium" : "Good"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md bg-secondary p-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <span
                      className={`font-bold ${
                        status === "critical"
                          ? "text-destructive"
                          : status === "warning"
                          ? "text-yellow-600"
                          : "text-accent"
                      }`}
                    >
                      {blood.temperature}°C
                    </span>
                  </div>
                  
                  {/* Add/Remove Blood Units */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAddBlood(blood.type)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Unit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRemoveBlood(blood.type)}
                      disabled={blood.units === 0}
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Use Unit
                    </Button>
                  </div>
                  
                  {status !== "normal" && (
                    <div className="space-y-1">
                      <p className="text-xs text-destructive">
                        ⚠️ Temperature outside safe range (2-{blood.threshold}°C)
                      </p>
                      {blood.coolingActive && (
                        <p className="text-xs font-medium text-primary">
                          🧊 Cooling System Activated
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BloodBank;
