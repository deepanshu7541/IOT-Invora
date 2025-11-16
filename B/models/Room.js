import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "Available" },   // Available / Occupied
  floor: Number,
  type: { type: String, default: "normal" },        // normal / operation
  threshold: Number,                                // only for operating rooms
});

export default mongoose.model("Room", RoomSchema);
