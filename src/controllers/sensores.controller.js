// src/controllers/sensores.controller.js
import Sensores from "../models/sensores.model.js";

export const crearDatos = async (req, res) => {
  try {
    const nuevoDato = new Sensores(req.body);
    await nuevoDato.save();
    res.status(201).json({ ok: true, data: nuevoDato });
  } catch (error) {
    res.status(500).json({ ok: false, error });
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
    res.status(500).json({ ok: false, error });
  }
};

export const obtenerUltimo = async (req, res) => {
  try {
    const ultimo = await Sensores.findOne().sort({ createdAt: -1 });
    res.json({ ok: true, data: ultimo });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};
