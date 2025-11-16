import { useEffect, useState } from "react";
import axios from "axios";
import { RoomCard } from "@/components/RoomCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen } from "lucide-react";

interface Room {
  name: string;
  status: string;
  floor: number;
}

const Rooms = () => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const operationRooms = [
    { name: "Operation Room 1", threshold: 25 },
    { name: "Operation Room 2", threshold: 25 },
    { name: "Operation Room 3", threshold: 25 },
    { name: "Operation Room 4", threshold: 25 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/rooms")
      .then((res) => {
        setAvailableRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rooms Management</h1>
        <p className="text-muted-foreground">Monitor room availability and conditions</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Available Rooms</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableRooms.map((room) => (
              <Card key={room.name}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <DoorOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{room.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Floor {room.floor}</p>
                      </div>
                    </div>
                    <Badge
                      variant={room.status === "Available" ? "default" : "secondary"}
                    >
                      {room.status}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Operating rooms remain unchanged */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Operating Rooms</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {operationRooms.map((room) => (
              <RoomCard
                key={room.name}
                name={room.name}
                type="operation"
                threshold={room.threshold}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;


// import { RoomCard } from "@/components/RoomCard";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DoorOpen } from "lucide-react";

// const Rooms = () => {
//   const availableRooms = [
//     { name: "Room 101", status: "Available", floor: 1 },
//     { name: "Room 102", status: "Available", floor: 1 },
//     { name: "Room 103", status: "Occupied", floor: 1 },
//     { name: "Room 201", status: "Available", floor: 2 },
//     { name: "Room 202", status: "Occupied", floor: 2 },
//     { name: "Room 203", status: "Available", floor: 2 },
//   ];

//   const operationRooms = [
//     { name: "Operation Room 1", threshold: 25 },
//     { name: "Operation Room 2", threshold: 25 },
//     { name: "Operation Room 3", threshold: 25 },
//     { name: "Operation Room 4", threshold: 25 },
//   ];

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Rooms Management</h1>
//         <p className="text-muted-foreground">Monitor room availability and conditions</p>
//       </div>

//       <div className="space-y-6">
//         <div>
//           <h2 className="mb-4 text-xl font-semibold text-foreground">Available Rooms</h2>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {availableRooms.map((room) => (
//               <Card key={room.name}>
//                 <CardHeader>
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-3">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//                         <DoorOpen className="h-6 w-6 text-primary" />
//                       </div>
//                       <div>
//                         <CardTitle className="text-base">{room.name}</CardTitle>
//                         <p className="text-sm text-muted-foreground">Floor {room.floor}</p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant={room.status === "Available" ? "default" : "secondary"}
//                     >
//                       {room.status}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//               </Card>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="mb-4 text-xl font-semibold text-foreground">Operating Rooms</h2>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {operationRooms.map((room) => (
//               <RoomCard
//                 key={room.name}
//                 name={room.name}
//                 type="operation"
//                 threshold={room.threshold}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Rooms;
