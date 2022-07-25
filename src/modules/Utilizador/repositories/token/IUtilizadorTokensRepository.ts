import { ICreateUtilizadorTokenDTO } from "../../dtos/UtilizadorDTO";
import { UtilizadorTokens } from "../../model/UtilizadorTokens"



interface IUtilizadorTokensRepository {

  create({
    expires_date,
    refresh_token,
    utilizador_id,
  }: ICreateUtilizadorTokenDTO): Promise<UtilizadorTokens>;

  findByUserIdAndRefreshToken(
    utilizador_id: string,
    refresh_token: string
  ): Promise<UtilizadorTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UtilizadorTokens>;
  findByUtilizador(utilizador_id: string): Promise<UtilizadorTokens>
}

export { IUtilizadorTokensRepository };
