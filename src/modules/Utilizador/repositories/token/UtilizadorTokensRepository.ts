import { getRepository, Repository } from 'typeorm';
import { ICreateUtilizadorTokenDTO } from '../../dtos/UtilizadorDTO';
import { UtilizadorTokens } from '../../model/UtilizadorTokens';
import { IUtilizadorTokensRepository } from "./IUtilizadorTokensRepository";


class UtilizadorTokensRepository implements IUtilizadorTokensRepository {
  private repository: Repository<UtilizadorTokens>;

  constructor() {
    this.repository = getRepository(UtilizadorTokens);
  }

  async create({
    expires_date,
    refresh_token,
    utilizador_id,
    created_at,
  }: ICreateUtilizadorTokenDTO): Promise<UtilizadorTokens> {
    const ProToken = this.repository.create({
      expires_date,
      refresh_token,
      utilizador_id,
      created_at,
    })

    await this.repository.save(ProToken)

    return ProToken;
  }

  async findByUserIdAndRefreshToken(
    utilizador_id: string,
    refresh_token: string
  ): Promise<UtilizadorTokens> {
    const ProToken = await this.repository.findOne({
      where: {
        utilizador_id,
        refresh_token,
      }
    });
    return ProToken!;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findByRefreshToken(refresh_token: string): Promise<UtilizadorTokens> {
    const ProToken = await this.repository.findOne({ where: { refresh_token: refresh_token } });
    return ProToken!;
  }

  async findByUtilizador(utilizador_id: string): Promise<UtilizadorTokens> {
    const ProToken = await this.repository.findOne({ where: { utilizador_id: utilizador_id } })
    return ProToken!;
  }
}

export { UtilizadorTokensRepository };
