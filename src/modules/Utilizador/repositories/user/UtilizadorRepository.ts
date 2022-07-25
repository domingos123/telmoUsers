import { resolve } from 'path';
import { getRepository, Repository } from 'typeorm';
import { IUtilizadorDTO } from '../../dtos/UtilizadorDTO';
import { Utilizador } from "../../model/Utilizador";
import { IUtilizadorRepository } from './IUtilizadorRepository';


class UtilizadorRepository implements IUtilizadorRepository {
    private repository: Repository<Utilizador>;

    constructor() {
        this.repository = getRepository(Utilizador);
    }
    async findByEmail(email: string): Promise<Utilizador> {
        const user = await this.repository.findOne({ email });
        return user!;
    }

    async findById(id: string): Promise<Utilizador> {
        const user = await this.repository.findOne({ id });
        return user!;
    }


    async create({ nome,
        data_nascimento,
        nif,
        bi,
        genero,
        password,
        email,
        morada,
        codigo_postal,
        localidade,
        admin }: IUtilizadorDTO): Promise<void> {
        const user = this.repository.create({
            nome,
            data_nascimento,
            nif,
            password,
            email,
            bi,
            genero,
            morada,
            codigo_postal,
            localidade,
            admin
        });

        await this.repository.save(user);
    }

    async update({ id, nome,
        data_nascimento,
        nif,
        bi,
        email,
        genero,
        morada,
        codigo_postal,
        localidade,
        admin }: IUtilizadorDTO): Promise<void> {
        const user = await this.repository.findOne({ id });
        if (nome) {
            user!.nome = nome;
        }
        if (email) {
            user!.email = email;
        }
        if (data_nascimento) {
            user!.data_nascimento = data_nascimento;
        }
        if (nif) {
            user!.nif = nif;
        }
        if (bi) {
            user!.bi = bi;
        }
        if (genero) {
            user!.genero = genero;
        }
        if (morada) {
            user!.morada = morada!;
        }
        if (codigo_postal) {
            user!.codigo_postal = codigo_postal;
        }
        if (localidade) {
            user!.localidade = localidade;
        }
        if (admin) {
            user!.admin = admin;
        }

        this.repository.save(user!)
    }


    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

    async list(): Promise<Utilizador[]> {
        const user = await this.repository.find();
        return user;
    }


    async findByName(nome: string): Promise<Utilizador> {
        const user = await this.repository.findOne({ nome });
        return user!;
    }


}

export { UtilizadorRepository }
