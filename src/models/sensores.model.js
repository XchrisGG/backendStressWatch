import mongoose from "mongoose";

const SensorSchema = new mongoose.Schema(
  {
    heartRate: { type: Number, default: null },
    light: { type: Number, default: null },
    gyro: { type: Number, default: null },
    timestamp: { type: Number, required: true }, // Viene desde el dispositivo
    userId: { type: String, default: null },

    // --- NUEVA SECCIÓN PARA EL ANÁLISIS DE PYTHON ---
    analisis: {
      estado: { type: String, default: "Pendiente" }, // Ej: "Estado Calmo", "Estrés Elevado"
      score: { type: Number, default: 0 },           // El puntaje numérico del algoritmo
      color: { type: String, default: "#808080" },   // Color hexadecimal para la UI del móvil
      sugerencia: { type: String, default: "" },     // El consejo de salud (técnica de respiración, etc.)
      timestamp_analisis: { type: String, default: null }
    }
  },
  { timestamps: true } // Esto te crea automáticamente createdAt y updatedAt
);

export default mongoose.model("Sensores", SensorSchema);