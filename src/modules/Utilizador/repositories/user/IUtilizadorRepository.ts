import { Utilizador } from "../../model/Utilizador";
import { IUtilizadorDTO, } from "../../dtos/UtilizadorDTO";


interface IUtilizadorRepository {
    update({ id, nome,
        data_nascimento,
        nif,
        bi,
        genero,
        morada,
        codigo_postal,
        localidade,
        admin, email }: IUtilizadorDTO): Promise<void>;

    findById(id: string): Promise<Utilizador>;
    findByName(nome: string): Promise<Utilizador>;
    findByEmail(email: string): Promise<Utilizador>;

    list(): Promise<Utilizador[]>;
    delete(id: string): Promise<void>;
    create({ nome,
        data_nascimento,
        password,
        nif,
        email,
        bi,
        genero,
        morada,
        codigo_postal,
        localidade,
        admin }: IUtilizadorDTO): Promise<void>;
}

export { IUtilizadorRepository };