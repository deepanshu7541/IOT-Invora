import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "./models/Room.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Seeding Rooms...");

  await Room.deleteMany();

  await Room.insertMany([
    { name: "Room 101", status: "Available", floor: 1, type: "normal" },
    { name: "Room 102", status: "Available", floor: 1, type: "normal" },
    { name: "Room 103", status: "Occupied", floor: 1, type: "normal" },
    { name: "Room 201", status: "Available", floor: 2, type: "normal" },
    { name: "Room 202", status: "Occupied", floor: 2, type: "normal" },
    { name: "Room 203", status: "Available", floor: 2, type: "normal" },

    // Operating rooms
    { name: "Operation Room 1", type: "operation", threshold: 25 },
    { name: "Operation Room 2", type: "operation", threshold: 25 },
    { name: "Operation Room 3", type: "operation", threshold: 25 },
    { name: "Operation Room 4", type: "operation", threshold: 25 },
  ]);

  console.log("Rooms seeded!");
  process.exit();
});