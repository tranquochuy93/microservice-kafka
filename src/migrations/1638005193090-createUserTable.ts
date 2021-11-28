import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1638005193090 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "email" character varying NOT NULL, 
                "firstName" character varying NOT NULL, 
                "lastName" character varying NOT NULL, 
                "password" character varying NOT NULL, 
                "language" character varying NOT NULL DEFAULT 'en', 
                "lastLoginAt" TIMESTAMP,
                "deletedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user";`)
    }
}
