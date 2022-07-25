import { inject, injectable } from "tsyringe";
import { Utilizador } from "../../../model/Utilizador";
import { IUtilizadorRepository } from "../../../repositories/user/IUtilizadorRepository";

@injectable()
class ListUtilizadorUseCase {
    constructor(
        @inject("UtilizadorRepository")
        private utilizadorRepository: IUtilizadorRepository) { }

    async execute(): Promise<Utilizador[]> {
        const utilizador = await this.utilizadorRepository.list();
        return utilizador;
    }
}
export { ListUtilizadorUseCase }