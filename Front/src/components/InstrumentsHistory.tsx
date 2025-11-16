import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

const mockHistory = [
  { id: 1, instrument: "Surgical Scalpel Set", status: "Sterilized", time: "2 hours ago" },
  { id: 2, instrument: "Ultrasound Machine", status: "In Use", time: "3 hours ago" },
  { id: 3, instrument: "Anesthesia Machine", status: "Maintenance", time: "5 hours ago" },
  { id: 4, instrument: "ECG Monitor", status: "Sterilized", time: "6 hours ago" },
  { id: 5, instrument: "Defibrillator", status: "Sterilized", time: "8 hours ago" },
];

export function InstrumentsHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Instruments History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/5"
            >
              <div className="flex items-center gap-3">
                {item.status === "Sterilized" ? (
                  <CheckCircle className="h-5 w-5 text-accent" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-warning" />
                )}
                <div>
                  <p className="font-medium text-foreground">{item.instrument}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <Badge
                variant={item.status === "Sterilized" ? "secondary" : "outline"}
                className={
                  item.status === "Sterilized"
                    ? "bg-accent/10 text-accent"
                    : item.status === "In Use"
                    ? "border-primary text-primary"
                    : "border-warning text-warning"
                }
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
