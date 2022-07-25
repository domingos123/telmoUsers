import { inject, injectable } from "tsyringe";
import { IUtilizadorRepository } from '../../../repositories/user/IUtilizadorRepository';
import { IUtilizadorTokensRepository } from '../../../repositories/token/IUtilizadorTokensRepository';


@injectable()
class DeleteUtilizadorUseCase {
    constructor(
        @inject("UtilizadorRepository")
        private utilizadorRepository: IUtilizadorRepository
    ) { }

    async execute(id: any): Promise<void> {
        const User = await this.utilizadorRepository.findById(id);

        if (!User) {
            throw new Error("User doesnt exist");
        }

        await this.utilizadorRepository.delete(id)
    }
}
export { DeleteUtilizadorUseCase }