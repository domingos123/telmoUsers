import { compare, compareSync, hash } from "bcryptjs";
import { Response, Request } from "express";
import { container } from "tsyringe";
import { UpdateUtilizadorUseCase } from "./UpdateUtilizadorUseCase"

class UpdateUtilizadorController {
    async handle(request: Request, response: Response): Promise<Response> {
        //recebe os parametros do body
        const {
            nome,
            data_nascimento,
            nif,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin,
            email } = request.body;
        const { id } = request.params;



        const updateUtilizadorUseCase = container.resolve(UpdateUtilizadorUseCase);
        const user = await updateUtilizadorUseCase.execute({
            id,
            nome,
            data_nascimento,
            nif,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin,
            email
        });

        return response.status(201).send(user);
    }
}

export { UpdateUtilizadorController }