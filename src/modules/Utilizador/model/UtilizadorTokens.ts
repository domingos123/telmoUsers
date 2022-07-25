import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Utilizador } from "./Utilizador";

@Entity("utilizadortokens")
class UtilizadorTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  utilizador_id: string;

  @ManyToOne(() => Utilizador)
  @JoinColumn({ name: "utilizador_id" })
  utilizador: Utilizador;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor(refresh_token: string, utilizador_id: string, utilizador: Utilizador, expires_date: Date, created_at: Date) {
    this.id = uuidV4()
    this.refresh_token = refresh_token;
    this.utilizador_id = utilizador_id;
    this.utilizador = utilizador;
    this.expires_date = expires_date;
    this.created_at = created_at;
  }
}

export { UtilizadorTokens }