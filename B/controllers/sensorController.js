import SensorReading from "../models/SensorReading.js";

const MIN_TEMP = 2;
const MAX_TEMP = 8;

function validateSignature(sig) {
    return sig === "dev-sig";
}

export const recordSensorReading = async (req, res) => {
    try {
        const { sensorId, ts, tempC, humidity, sig } = req.body;

        if (!validateSignature(sig)) {
            return res.status(401).json({ message: "Invalid signature" });
        }

        let alert = false;
        let alertType = null;

        if (tempC < MIN_TEMP || tempC > MAX_TEMP) {
            alert = true;
            alertType = `Temperature Out of Range (${tempC}°C)`;
        }

        const reading = await SensorReading.create({
            sensorId,
            ts,
            tempC,
            humidity,
            sig,
            alert,
            alertType
        });

        res.status(201).json({
            message: "Reading recorded",
            reading
        });

    } catch (err) {
        console.error("Error recording sensor reading:", err);
        res.status(500).json({ message: "Server error" });
    }
};