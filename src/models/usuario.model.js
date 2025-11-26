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
    sexo: {
      type: String,
      enum: ["masculino", "femenino", "otro"],
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    imagenPerfil: {
      type: String, // será una URL
      default: "",
    },
    pais: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", UsuarioSchema);
