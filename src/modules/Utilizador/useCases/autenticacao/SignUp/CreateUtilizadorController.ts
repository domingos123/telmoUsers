import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateUtilizadorUseCase } from "./CreateUtilizadorUseCase"

class CreateUtilizadorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome,
            data_nascimento,
            nif,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin,
            email,
            password,
            confirm_password } = request.body;

        const x = new Date();

        const createUtilizadorUseCase = container.resolve(CreateUtilizadorUseCase);
        //recebe os parametros para criar um socio e envia-os para o usecase
        await createUtilizadorUseCase.execute({
            nome,
            data_nascimento,
            nif,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin,
            email,
            password,
            confirm_password
        });

        return response.status(201).send();
    }
}

export { CreateUtilizadorController }