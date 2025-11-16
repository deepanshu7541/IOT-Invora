import { useEffect, useState } from "react";
import axios from "axios";

import { RoomCard } from "@/components/RoomCard";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { DoorOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Room {
  id: string;
  name: string;
  status: string;
  floor: number;
  type: string;
  threshold?: number;
}

const Rooms = () => {
  const { toast } = useToast();
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [operationRooms, setOperationRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------------
  // FETCH ROOMS FROM BACKEND (axios)
  // ------------------------------------
  const fetchRooms = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:4000/api/rooms");

      const data = res.data || [];

      const regular = data.filter((room: Room) => room.type !== "operation");
      const operation = data.filter((room: Room) => room.type === "operation");

      setAvailableRooms(regular);
      setOperationRooms(operation);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rooms",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ------------------------------------
  // UPDATE ROOM STATUS
  // ------------------------------------
  const handleStatusChange = async (roomId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:4000/api/rooms/${roomId}`, {
        status: newStatus,
      });

      toast({
        title: "Status Updated",
        description: `Room status changed to ${newStatus}`,
      });

      fetchRooms();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update room status",
      });
    }
  };

  // ------------------------------------
  // UI RETURN
  // ------------------------------------
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rooms Management</h1>
        <p className="text-muted-foreground">
          Monitor room availability and conditions
        </p>
      </div>

      <div className="space-y-6">
        {/* ---------------------------------------------------- */}
        {/* Available Rooms */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Available Rooms
          </h2>

          {loading ? (
            <p className="text-muted-foreground">Loading rooms...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableRooms.map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <DoorOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{room.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Floor {room.floor}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={
                          room.status === "Available"
                            ? "default"
                            : room.status === "Maintenance"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {room.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Select
                      value={room.status}
                      onValueChange={(value) =>
                        handleStatusChange(room.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Booked">Booked</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* Operating Rooms */}
        {/* ---------------------------------------------------- */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Operating Rooms
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {operationRooms.map((room) => (
              <RoomCard
                key={room.id}
                name={room.name}
                type="operation"
                threshold={room.threshold || 25}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
