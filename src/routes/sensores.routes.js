import { Router } from "express";
import {
  crearDatos,
  actualizarDatos,
  obtenerUltimo,
} from "../controllers/sensores.controller.js";

const router = Router();

router.post("/", crearDatos);
router.put("/:id", actualizarDatos);
router.get("/ultimo", obtenerUltimo);

export default router;
