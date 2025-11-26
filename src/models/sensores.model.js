// src/models/sensores.model.js
import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema(
  {
    pulso: Number,
    temperatura: Number,
    estres: Number,
    calidad_sueno: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Sensores", SensorSchema);
