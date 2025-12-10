// src/routes/auth.routes.js
import { Router } from "express";
import { registrar, login, obtenerPerfil } from "../controllers/auth.controller.js";
import { verificarToken } from "../middleware/auth.js";


const router = Router();

router.post("/register", registrar);
router.post("/login", login);
router.get("/me", verificarToken, obtenerPerfil);

export default router;
