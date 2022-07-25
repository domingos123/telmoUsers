import { container } from "tsyringe";

import "./providers";

import { IUtilizadorTokensRepository } from "../../modules/Utilizador/repositories/token/IUtilizadorTokensRepository";
import { IUtilizadorRepository } from "../../modules/Utilizador/repositories/user/IUtilizadorRepository";
import { UtilizadorRepository } from "../../modules/Utilizador/repositories/user/UtilizadorRepository";
import { UtilizadorTokensRepository } from "../../modules/Utilizador/repositories/token/UtilizadorTokensRepository";


container.registerSingleton<IUtilizadorRepository>(
    "UtilizadorRepository",
    UtilizadorRepository
);

container.registerSingleton<IUtilizadorTokensRepository>(
    "UtilizadorTokensRepository",
    UtilizadorTokensRepository
);
