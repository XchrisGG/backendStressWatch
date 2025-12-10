// src/controllers/sensores.controller.js
import Sensores from "../models/sensores.model.js";

export const crearDatos = async (req, res) => {
  try {
    const { heartRate, light, gyro, timestamp, userId } = req.body;

    const nuevoDato = new Sensores({
      heartRate,
      light,
      gyro,
      timestamp,
      userId: userId || null,
    });

    await nuevoDato.save();

    res.status(201).json({ ok: true, data: nuevoDato });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const actualizarDatos = async (req, res) => {
  try {
    const { id } = req.params;

    const datosActualizados = await Sensores.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({ ok: true, data: datosActualizados });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const obtenerUltimo = async (req, res) => {
  try {
    const ultimo = await Sensores.findOne().sort({ createdAt: -1 });

    res.json({ ok: true, data: ultimo });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
export const obtenerHistorialPorUsuario = async (req, res) => {
    try {
        const { userId } = req.params; // Capturamos el ID del usuario de la URL
        
        // Buscamos todos los documentos donde el campo userId coincida con el parámetro
        const historial = await Sensores.find({ userId: userId }).sort({ createdAt: 1 });

        // Si no hay datos, devolvemos un array vacío (o un 404, pero 200 con [] es mejor para React)
        if (historial.length === 0) {
            return res.status(200).json([]);
        }

        // Devolvemos el array de mediciones
        return res.json(historial); 

    } catch (error) {
        console.error("Error al obtener historial:", error);
        res.status(500).json({ ok: false, error: error.message });
    }
};
