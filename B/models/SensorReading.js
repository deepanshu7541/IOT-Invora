import mongoose from "mongoose";

const sensorReadingSchema = new mongoose.Schema({
    sensorId: { type: String, required: true },
    ts: { type: Date, required: true },
    tempC: { type: Number, required: true },
    humidity: { type: Number, required: true },
    sig: { type: String, required: true },
    alert: { type: Boolean, default: false },
    alertType: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("SensorReading", sensorReadingSchema);