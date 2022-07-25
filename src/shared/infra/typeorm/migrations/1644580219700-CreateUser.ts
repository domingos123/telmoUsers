import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSocio1644580219700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "User",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "bi",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "nif",
                        type: "varchar",
                    },
                    {
                        name: "data_nascimento",
                        type: "date",
                    },
                    {
                        name: "genero",
                        type: "varchar"
                    },
                    {
                        name: "morada",
                        type: "varchar"
                    },
                    {
                        name: "codigo_postal",
                        type: "varchar"
                    },
                    {
                        name: "localidade",
                        type: "varchar"
                    },
                    {
                        name: "admin",
                        type: "boolean",
                        default: false,
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("User");
    }
}