import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListUtilizadorUseCase } from "./ListUtilizadorUseCase"

class ListUtilizadorController {
    async handle(request: Request, response: Response) {
        const listUtilizadorUseCase = container.resolve(ListUtilizadorUseCase);
        const user = await listUtilizadorUseCase.execute();

        return response.status(201).send(user);
    }
}

export { ListUtilizadorController }