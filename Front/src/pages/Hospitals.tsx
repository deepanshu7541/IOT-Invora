import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Phone, ChevronDown, DoorOpen } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const hospitals = [
  {
    id: 1,
    name: "Central Medical Center",
    location: "Downtown District",
    phone: "+1 234 567 8901",
    status: "Active",
    departments: [
      {
        name: "Cardiology",
        rooms: ["Room 101", "Room 102", "Room 103"],
      },
      {
        name: "Neurology",
        rooms: ["Room 201", "Room 202"],
      },
      {
        name: "Emergency",
        rooms: ["ER-1", "ER-2", "ER-3", "ER-4"],
      },
    ],
  },
  {
    id: 2,
    name: "North Valley Hospital",
    location: "North Valley",
    phone: "+1 234 567 8902",
    status: "Active",
    departments: [
      {
        name: "Pediatrics",
        rooms: ["Room 301", "Room 302", "Room 303"],
      },
      {
        name: "Orthopedics",
        rooms: ["Room 401", "Room 402"],
      },
    ],
  },
  {
    id: 3,
    name: "East Side Clinic",
    location: "East District",
    phone: "+1 234 567 8903",
    status: "Active",
    departments: [
      {
        name: "General Medicine",
        rooms: ["Room 501", "Room 502"],
      },
      {
        name: "Surgery",
        rooms: ["OR-1", "OR-2", "OR-3"],
      },
    ],
  },
  {
    id: 4,
    name: "West End Medical",
    location: "West End",
    phone: "+1 234 567 8904",
    status: "Active",
    departments: [
      {
        name: "Radiology",
        rooms: ["Scan-1", "Scan-2"],
      },
      {
        name: "Oncology",
        rooms: ["Room 601", "Room 602", "Room 603"],
      },
    ],
  },
];

const Hospitals = () => {
  const [openHospitals, setOpenHospitals] = useState<number[]>([]);

  const toggleHospital = (id: number) => {
    setOpenHospitals((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hospitals</h1>
        {/* <p className="text-muted-foreground">Manage and monitor all hospital facilities</p> */}
      </div>

      <div className="grid gap-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {hospital.location}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {hospital.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{hospital.phone}</span>
                </div>

                <Collapsible open={openHospitals.includes(hospital.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => toggleHospital(hospital.id)}
                    >
                      <span>
                        Departments ({hospital.departments.length})
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openHospitals.includes(hospital.id) ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2">
                    {hospital.departments.map((dept) => (
                      <div
                        key={dept.name}
                        className="rounded-md border border-border bg-secondary/50 p-3"
                      >
                        <h4 className="font-semibold text-foreground mb-2">
                          {dept.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {dept.rooms.map((room) => (
                            <div
                              key={room}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <DoorOpen className="h-3 w-3" />
                              {room}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
