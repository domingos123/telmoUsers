import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdminToken1644510952015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "userToken",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                    },
                    {
                        name: "refresh_token",
                        type: "varchar",
                    },
                    {
                        name: "utilizador_id",
                        type: "varchar",
                    },
                    {
                        name: "expires_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("userToken");
    }
}