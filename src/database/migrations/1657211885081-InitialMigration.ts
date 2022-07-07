import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1657211885081 implements MigrationInterface {
    name = 'InitialMigration1657211885081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nft" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "published" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" uuid, CONSTRAINT "PK_8f46897c58e23b0e7bf6c8e56b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nftIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "star" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" uuid, "nftIdId" uuid, CONSTRAINT "PK_e0a31656542918b9e028c3b9f5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nft" ADD CONSTRAINT "FK_0e4a6b186c3fef8c0bf05f973e9" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_92f14416f70d9fe27cf48d60120" FOREIGN KEY ("nftIdId") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7b234a25c33f190539f07fe5feb" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "star" ADD CONSTRAINT "FK_c257c14f64c3035cb85724bcd81" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "star" ADD CONSTRAINT "FK_d4b9fb40f016ddd2fbad8afced2" FOREIGN KEY ("nftIdId") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "star" DROP CONSTRAINT "FK_d4b9fb40f016ddd2fbad8afced2"`);
        await queryRunner.query(`ALTER TABLE "star" DROP CONSTRAINT "FK_c257c14f64c3035cb85724bcd81"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7b234a25c33f190539f07fe5feb"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_92f14416f70d9fe27cf48d60120"`);
        await queryRunner.query(`ALTER TABLE "nft" DROP CONSTRAINT "FK_0e4a6b186c3fef8c0bf05f973e9"`);
        await queryRunner.query(`DROP TABLE "star"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "nft"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
