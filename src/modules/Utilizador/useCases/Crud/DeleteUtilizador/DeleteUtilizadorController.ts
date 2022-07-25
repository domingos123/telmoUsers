import { Response, Request } from "express";
import { container } from "tsyringe";
import { DeleteUtilizadorUseCase } from "./DeleteUtilizadorUseCase"

class DeleteUtilizadorController {
    async handle(request: Request, response: Response): Promise<Response> {

        const id = request.params;

        const deleteUtilizadorUseCase = container.resolve(DeleteUtilizadorUseCase);
        await deleteUtilizadorUseCase.execute(id);
        return response.send().status(201);
    }
}

export { DeleteUtilizadorController }