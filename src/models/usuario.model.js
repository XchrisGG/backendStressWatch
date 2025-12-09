// src/models/usuario.model.js
import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    edad : {
      type: String,
      required: true,
      trim: true,

    },
    sexo: {
      type: String,
      enum: ["masculino", "femenino", "otro"],
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },

    pais: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatarIndex: {
      type: Number, 
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
