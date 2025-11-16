import express from "express";
import { recordSensorReading } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/reading", recordSensorReading);

export default router;