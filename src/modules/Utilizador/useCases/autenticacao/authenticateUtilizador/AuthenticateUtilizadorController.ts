import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUtilizadorUseCase } from "./AuthenticateUtilizadorUseCase";

class AuthenticateUtilizadorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUtilizadorUseCase = container.resolve(AuthenticateUtilizadorUseCase);
        const token = await authenticateUtilizadorUseCase.execute({
            email,
            password
        });
        return response.json(token)
    }
}
export { AuthenticateUtilizadorController }