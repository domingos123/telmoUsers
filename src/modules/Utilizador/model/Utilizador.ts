import { v4 as uuidV4 } from "uuid"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("utilizadores")
class Utilizador {

    @PrimaryColumn()
    id: string;
    @Column()
    email: string;
    @Column()
    nome: string;
    @Column()
    password: string;
    @Column()
    data_nascimento: string;
    @Column()
    nif: string;
    @Column()
    bi?: string;
    @Column()
    genero?: string;
    @Column()
    morada?: string;
    @Column()
    codigo_postal: string;
    @Column()
    localidade: string;
    @Column()
    admin: boolean;



    constructor(nome: string, password: string, data_nascimento: string, nif: string, bi: string, genero: string,
        morada: string, codigo_postal: string, localidade: string, admin: boolean, email: string) {

        this.id = uuidV4()
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.nif = nif;
        this.bi = bi;
        this.genero = genero;
        this.morada = morada;
        this.localidade = localidade;
        this.admin = admin;
        this.codigo_postal = codigo_postal;
        this.password = password;
        this.email = email;
    }
}
export { Utilizador }