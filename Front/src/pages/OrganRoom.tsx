import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Thermometer, Clock, AlertTriangle, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCoolingSystem } from "@/contexts/CoolingSystemContext";
import { supabase } from "@/integrations/supabase/client";

interface Organ {
  id: string;
  name: string;
  type: string;
  age: number;
  temperature: number;
  temperature_threshold: number;
  criticality: "Low" | "Medium" | "High" | "Critical";
  coolingActive: boolean;
}

const OrganRoom = () => {
  const { toast } = useToast();
  const { manualOverride } = useCoolingSystem();
  const [organs, setOrgans] = useState<Organ[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Heart",
    age: 1,
    criticality: "Medium",
    temperature_threshold: 6,
  });

  useEffect(() => {
    fetchOrgans();
  }, []);

  const fetchOrgans = async () => {
    try {
      const { data, error } = await supabase
        .from("organs")
        .select("*")
        .order("name");

      if (error) throw error;

      let organsData = data || [];
      
      // Add dummy data if no organs exist
      if (organsData.length === 0) {
        const dummyOrgans = [
          { name: "Heart-001", type: "Heart", age: 32, criticality: "Critical", temperature_threshold: 6 },
          { name: "Liver-002", type: "Liver", age: 45, criticality: "High", temperature_threshold: 6 },
          { name: "Kidney-003", type: "Kidney", age: 28, criticality: "Medium", temperature_threshold: 6 },
          { name: "Lung-004", type: "Lung", age: 38, criticality: "High", temperature_threshold: 6 },
          { name: "Kidney-005", type: "Kidney", age: 52, criticality: "Low", temperature_threshold: 6 },
        ];
        
        // Insert dummy data into database
        const { data: insertedData } = await supabase
          .from("organs")
          .insert(dummyOrgans)
          .select();
        
        organsData = insertedData || [];
      }

      const organsWithTemp = organsData.map((organ) => ({
        ...organ,
        criticality: organ.criticality as "Low" | "Medium" | "High" | "Critical",
        temperature: parseFloat((Math.random() * 10 + 1).toFixed(1)),
        coolingActive: false,
      }));

      setOrgans(organsWithTemp);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load organs",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrgan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("organs").insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Organ added successfully",
      });

      setDialogOpen(false);
      setFormData({
        name: "",
        type: "Heart",
        age: 1,
        criticality: "Medium",
        temperature_threshold: 6,
      });
      fetchOrgans();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add organ",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrgans((prev) =>
        prev.map((organ) => {
          const newTemp = parseFloat((Math.random() * 10 + 1).toFixed(1));
          const previousTemp = organ.temperature;
          const isCritical = newTemp > organ.temperature_threshold || newTemp < 2;

          if (
            isCritical &&
            (previousTemp <= organ.temperature_threshold && previousTemp >= 2)
          ) {
            toast({
              variant: "destructive",
              title: `Temperature Alert - ${organ.name}`,
              description: `Temperature is ${newTemp}°C. Safe range: 2-${organ.temperature_threshold}°C`,
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

  if (loading) {
    return <div className="text-center py-8">Loading organs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organ Storage Room</h1>
          <p className="text-muted-foreground">
            Monitor organ inventory, age, temperature, and criticality status
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Organ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Organ</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddOrgan} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organ Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Heart #A-001"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Organ Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Heart">Heart</SelectItem>
                    <SelectItem value="Kidney">Kidney</SelectItem>
                    <SelectItem value="Liver">Liver</SelectItem>
                    <SelectItem value="Lung">Lung</SelectItem>
                    <SelectItem value="Pancreas">Pancreas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (hours)</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criticality">Criticality</Label>
                <Select
                  value={formData.criticality}
                  onValueChange={(value) =>
                    setFormData({ ...formData, criticality: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Temperature Threshold (°C)</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={formData.temperature_threshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      temperature_threshold: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Organ</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organs.map((organ) => {
          const status = getTemperatureStatus(organ.temperature, organ.temperature_threshold);
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
                        Temperature outside safe range (2-{organ.temperature_threshold}°C)
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
