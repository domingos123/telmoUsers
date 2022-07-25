import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";
import auth from "../../../../../config/auth";
import { IDateProvider } from "../../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUtilizadorTokensRepository } from "../../../repositories/token/IUtilizadorTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UtilizadorTokensRepository")
    private utilizadorTokensRepository: IUtilizadorTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const utilizador_id = sub;

    const utilizadorToken = await this.utilizadorTokensRepository.findByUserIdAndRefreshToken(
      utilizador_id,
      token
    );

    if (!utilizadorToken) {
      throw new Error("Refresh Token does not exists!");
    }

    await this.utilizadorTokensRepository.deleteById(utilizadorToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.utilizadorTokensRepository.create({
      expires_date,
      refresh_token,
      utilizador_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: utilizador_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
