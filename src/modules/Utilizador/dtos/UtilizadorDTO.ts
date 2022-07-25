
interface IUtilizadorDTO {
    id?: any;
    nome?: string;
    email?: string;
    data_nascimento?: string;
    nif?: string;
    bi?: string;
    genero?: string;
    morada?: string;
    codigo_postal?: string;
    localidade?: string;
    admin?: boolean;
    password?: string;
    confirm_password?: string;
}

interface ICreateUtilizadorTokenDTO {
    utilizador_id: string;
    expires_date: Date;
    refresh_token: string;
    created_at?: Date;
}


export { IUtilizadorDTO, ICreateUtilizadorTokenDTO }