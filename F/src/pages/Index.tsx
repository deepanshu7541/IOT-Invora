import { Activity, Building2, Thermometer, Users, AlertTriangle, Package, TrendingUp, Clock, Calendar, ShoppingCart, FileText, HeartPulse, Droplet, Siren, Power } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { InstrumentsHistory } from "@/components/InstrumentsHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCoolingSystem } from "@/contexts/CoolingSystemContext";

const Index = () => {
  const { manualOverride, setManualOverride } = useCoolingSystem();
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Complete healthcare facility monitoring and management system</p>
        </div>
        
        {/* Manual Override Control */}
        <Card className="w-80">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Power className="h-5 w-5" />
              Cooling System Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cooling-override" className="text-sm font-medium">
                  Manual Override
                </Label>
                <p className="text-xs text-muted-foreground">
                  {manualOverride ? "Automatic cooling enabled" : "Automatic cooling disabled"}
                </p>
              </div>
              <Switch
                id="cooling-override"
                checked={manualOverride}
                onCheckedChange={setManualOverride}
              />
            </div>
            {!manualOverride && (
              <div className="mt-3 rounded-md bg-warning/10 p-2">
                <p className="text-xs text-warning font-medium">
                  ⚠️ Automatic cooling is OFF. Temperature alerts will not trigger cooling systems.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Rooms"
          value="24"
          icon={Thermometer}
          trend="+2 from last month"
          variant="primary"
        />
        <StatsCard
          title="Active Hospitals"
          value="8"
          icon={Building2}
          trend="All operational"
          variant="accent"
        />
        <StatsCard
          title="Staff on Duty"
          value="156"
          icon={Users}
          trend="+12 from yesterday"
        />
        <StatsCard
          title="Alerts Today"
          value="3"
          icon={Activity}
          trend="2 resolved"
          variant="warning"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Blood Units"
          value="1,245"
          icon={Droplet}
          trend="+45 units today"
          variant="primary"
        />
        <StatsCard
          title="Surgeries Today"
          value="18"
          icon={HeartPulse}
          trend="5 in progress"
          variant="accent"
        />
        <StatsCard
          title="Equipment Orders"
          value="32"
          icon={Package}
          trend="8 pending approval"
        />
        <StatsCard
          title="Critical Alerts"
          value="2"
          icon={Siren}
          trend="Requires attention"
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Temperature Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Operation Rooms</p>
                  <p className="text-sm text-muted-foreground">12 rooms • 6 in use</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">Normal</p>
                  <p className="text-sm text-muted-foreground">22.5°C avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Blood Bank Storage</p>
                  <p className="text-sm text-muted-foreground">8 units • All monitored</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">Normal</p>
                  <p className="text-sm text-muted-foreground">3.8°C avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Available Rooms</p>
                  <p className="text-sm text-muted-foreground">4 rooms ready</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">Normal</p>
                  <p className="text-sm text-muted-foreground">21.2°C avg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">OR-3 Temperature</p>
                    <p className="text-xs text-muted-foreground">26°C - Above threshold</p>
                  </div>
                  <Badge variant="outline" className="text-xs">2m ago</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Blood Bank A+</p>
                    <p className="text-xs text-muted-foreground">Low inventory - 15 units</p>
                  </div>
                  <Badge variant="outline" className="text-xs">15m ago</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-accent mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Equipment Order</p>
                    <p className="text-xs text-muted-foreground">Pending approval - 5 items</p>
                  </div>
                  <Badge variant="outline" className="text-xs">1h ago</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InstrumentsHistory />

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { hospital: "City General", items: 8, status: "Delivered", time: "2h ago" },
                { hospital: "Metro Hospital", items: 12, status: "Processing", time: "4h ago" },
                { hospital: "St. Mary's", items: 5, status: "Delivered", time: "1d ago" },
                { hospital: "Care Center", items: 15, status: "Pending", time: "2d ago" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.hospital}</p>
                    <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                  </div>
                  <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Surgery
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Order Equipment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Staff
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hospital Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hospital Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "City General Hospital", rooms: 6, alerts: 0, staff: 42 },
              { name: "Metro Hospital", rooms: 4, alerts: 1, staff: 38 },
              { name: "St. Mary's Medical", rooms: 5, alerts: 0, staff: 35 },
              { name: "Care Center", rooms: 3, alerts: 2, staff: 28 },
            ].map((hospital, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="font-semibold text-foreground">{hospital.name}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{hospital.rooms} active rooms</p>
                  <p className="text-muted-foreground">{hospital.staff} staff members</p>
                  {hospital.alerts > 0 ? (
                    <p className="text-warning font-medium">{hospital.alerts} active alerts</p>
                  ) : (
                    <p className="text-accent font-medium">All systems normal</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
