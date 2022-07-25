import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUtilizadorDTO } from '../../../dtos/UtilizadorDTO';
import { IUtilizadorTokensRepository } from "../../../repositories/token/IUtilizadorTokensRepository";
import { IUtilizadorRepository } from "../../../repositories/user/IUtilizadorRepository";


@injectable()
class UpdateUtilizadorUseCase {
    constructor(
        @inject("UtilizadorRepository")
        private utilizadorRepository: IUtilizadorRepository
    ) { }

    async execute({ id,
        nome,
        data_nascimento,
        nif,
        bi,
        genero,
        morada,
        codigo_postal,
        localidade,
        admin,
        email }: IUtilizadorDTO): Promise<void> {

        const UtilizadorEmail = await this.utilizadorRepository.findByEmail(email!);

        if (!UtilizadorEmail) {
            throw new Error("admin with this email doesn´t exist");
        }

        await this.utilizadorRepository.update({
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
    }
}
export { UpdateUtilizadorUseCase }