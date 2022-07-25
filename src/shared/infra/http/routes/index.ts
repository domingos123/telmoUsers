import { Router } from "express";
import { UtilizadorRoutes } from "./Utilizador.routes";

const router = Router();

router.use("/Utilizadores", UtilizadorRoutes);

export { router };