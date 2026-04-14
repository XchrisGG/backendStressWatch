// src/controllers/sensores.controller.js
import Sensores from "../models/sensores.model.js";
import axios from "axios";

export const crearDatos = async (req, res) => {
  try {
    const { heartRate, light, gyro, timestamp, userId } = req.body;
    
    console.log(`[Sensor-In] Recibiendo datos del usuario: ${userId || 'Invitado'}`);
    console.log(`[Sensor-In] HR: ${heartRate}, Light: ${light}, Gyro: ${gyro}`);

    // 1. LLAMADA AL MICROSERVICIO DE PYTHON
    let interpretacion = null;
    const pythonURL = 'https://apidatos-ivwy.onrender.com/analizar'; // Asegúrate de incluir el endpoint /analizar

    try {
      console.log(`[Python-Out] Solicitando análisis a: ${pythonURL}`);
      
      const pythonResponse = await axios.post(pythonURL, {
        heartRate,
        light,
        gyro
      }, { timeout: 45000 }); // Espera 45 seg (ideal para el "despertar" de Render)

      interpretacion = pythonResponse.data;
      console.log("[Python-Success] Análisis recibido correctamente:", interpretacion);

    } catch (errorPython) {
      console.error("--- ERROR EN COMUNICACIÓN CON PYTHON ---");
      if (errorPython.response) {
        // El servidor respondió con un error (4xx, 5xx)
        console.error(`Status: ${errorPython.response.status}`);
        console.error(`Data:`, errorPython.response.data);
      } else if (errorPython.request) {
        // No hubo respuesta (posiblemente el servidor está apagado o tardó mucho)
        console.error("No se recibió respuesta de Python. ¿Está el servidor activo o despertando?");
      } else {
        console.error("Error de configuración de Axios:", errorPython.message);
      }
      console.error("-----------------------------------------");
    }

    // 2. CREAR EL DOCUMENTO CON EL ANÁLISIS INCLUIDO
    const nuevoDato = new Sensores({
      heartRate,
      light,
      gyro,
      timestamp,
      userId: userId || null,
      analisis: interpretacion // Si falló arriba, esto será null o usará el default del modelo
    });

    await nuevoDato.save();
    console.log(`[DB-Saved] Registro guardado con éxito en Mongo Atlas. ID: ${nuevoDato._id}`);

    res.status(201).json({ ok: true, data: nuevoDato });
  } catch (error) {
    console.error("[Fatal-Error] Error en crearDatos:", error.message);
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
