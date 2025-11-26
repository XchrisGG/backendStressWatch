// src/models/sensores.model.js
import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema(
  {
    heartRate: { type: Number, default: null },
    light: { type: Number, default: null },
    gyro: { type: Number, default: null },
    timestamp: { type: Number, required: true }, // viene desde el reloj/móvil
    userId: { type: String, default: null }, // futuro: id del usuario cuando exista
  },
  { timestamps: true } // createdAt / updatedAt automáticos
);

export default mongoose.model("Sensores", SensorSchema);
