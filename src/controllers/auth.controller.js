// src/controllers/auth.controller.js
import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrar = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // evitar que se registren usuarios duplicados
    const existe = await Correo.findOne({ correo });
    if (existe) {
      return res.status(400).json({ ok: false, msg: "El usuario ya existe" });
    }

    // encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const nuevoUsuario = new Correo({
      ...req.body,
      password: passwordHash,
    });

    await nuevoUsuario.save();

    return res.status(201).json({ ok: true, correo: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ ok: false, msg: "Usuario no encontrado" });
    }

    // validar contraseña
    const valida = bcrypt.compareSync(password, user.password);
    if (!valida) {
      return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    // generar token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      ok: true,
      token,
      usuario: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.usuario,
      }
    });

  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    const user = await Usuario.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    res.json({ ok: true, usuario: user });

  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
