import { inject, injectable } from 'tsyringe';
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import auth from '../../../../../config/auth';
import { IUtilizadorTokensRepository } from '../../../repositories/token/IUtilizadorTokensRepository';
import { IDateProvider } from '../../../../../shared/container/providers/DateProvider/IDateProvider';
import { IUtilizadorRepository } from '../../../repositories/user/IUtilizadorRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    utilizador: {
        nome: string,
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUtilizadorUseCase {
    constructor(
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("UtilizadorTokensRepository")
        private utilizadorTokensRepository: IUtilizadorTokensRepository,
        @inject("UtilizadorRepository")
        private utilizadorRepository: IUtilizadorRepository
    ) { }
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const utilizador = await this.utilizadorRepository.findByEmail(email);

        if (!utilizador) {
            throw new Error("Email or password incorrect");
        }
        const Utilizador_id = utilizador.id;
        const passwordMatch = await compare(password, utilizador['password']!)

        if (!passwordMatch) {
            throw new Error("Passwords don´t match");
        }

        const token = sign({}, auth.secret_token, {
            subject: utilizador['id'],
            expiresIn: auth.expires_in_token
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: utilizador['id'],
            expiresIn: auth.expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days);

        const token_ = await this.utilizadorTokensRepository.findByUtilizador(
            Utilizador_id
        )

        if (token_) {
            this.utilizadorTokensRepository.deleteById(token_.id)
        }

        await this.utilizadorTokensRepository.create({
            utilizador_id: utilizador['id'],
            expires_date: refresh_token_expires_date,
            refresh_token,
            created_at: new Date(),
        })

        const tokenReturn: IResponse = {
            token,
            utilizador: {
                nome: utilizador['nome']
            },
            refresh_token,
        };


        return tokenReturn
    }
}

export { AuthenticateUtilizadorUseCase }