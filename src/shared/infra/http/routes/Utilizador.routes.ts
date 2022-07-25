import { Router } from "express";


import { AuthenticateUtilizadorController } from "../../../../modules/Utilizador/useCases/autenticacao/authenticateUtilizador/AuthenticateUtilizadorController";
import { CreateUtilizadorController } from "../../../../modules/Utilizador/useCases/autenticacao/SignUp/CreateUtilizadorController"

import { ListUtilizadorController } from "../../../../modules/Utilizador/useCases/Crud/listUtilizador/ListUtilizadorController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUtilizadorController } from "../../../../modules/Utilizador/useCases/Crud/updateUtilizador/UpdateUtilizadorController";
import { RefreshTokenController } from "../../../../modules/Utilizador/useCases/autenticacao/refreshToken/RefreshTokenController";
import { DeleteUtilizadorController } from "../../../../modules/Utilizador/useCases/Crud/DeleteUtilizador/DeleteUtilizadorController";

const updateUtilizadorController = new UpdateUtilizadorController();
const authenticateUtilizadorController = new AuthenticateUtilizadorController();
const createUtilizadorController = new CreateUtilizadorController();
const refreshTokenController = new RefreshTokenController();
const listUtilizadorController = new ListUtilizadorController();
const deleteUtilizadorController = new DeleteUtilizadorController();

const UtilizadorRoutes = Router();



//Autenticacao
UtilizadorRoutes.post("/SignIn", authenticateUtilizadorController.handle);
UtilizadorRoutes.post("/SignUp", createUtilizadorController.handle);
UtilizadorRoutes.post("/refresh-token", ensureAuthenticated, refreshTokenController.handle);

//Crud
UtilizadorRoutes.get("/", ensureAuthenticated, listUtilizadorController.handle);
UtilizadorRoutes.delete("/:id", ensureAuthenticated, deleteUtilizadorController.handle);
UtilizadorRoutes.put("/:id", ensureAuthenticated, updateUtilizadorController.handle);



export { UtilizadorRoutes }