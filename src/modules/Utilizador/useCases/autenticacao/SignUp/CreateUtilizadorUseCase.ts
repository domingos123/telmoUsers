import { inject, injectable } from "tsyringe";
import { IUtilizadorRepository } from "../../../repositories/user/IUtilizadorRepository"
import { IUtilizadorDTO } from '../../../dtos/UtilizadorDTO';
import { hash } from "bcryptjs";


@injectable()
class CreateUtilizadorUseCase {
    constructor(
        @inject("UtilizadorRepository")
        private utilizadorRepository: IUtilizadorRepository
    ) { }

    async execute({ nome,
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
        confirm_password }: IUtilizadorDTO): Promise<void> {

        const UtilizadorAlreadyExists = await this.utilizadorRepository.findByEmail(email!);

        if (UtilizadorAlreadyExists) {
            throw new Error("User já existe");
        }

        if (password != confirm_password) {
            throw new Error("Passwords dont match");
        }
        //se nao existir, encripta a palavra pass e envia para o repositorio
        const passwordHash = await hash(password!, 8)

        await this.utilizadorRepository.create({
            nome,
            email,
            password: passwordHash,
            data_nascimento,
            nif,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin
        });
    }
}
export { CreateUtilizadorUseCase }