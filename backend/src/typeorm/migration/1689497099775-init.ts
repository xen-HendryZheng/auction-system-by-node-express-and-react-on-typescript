import { MigrationInterface, QueryRunner } from "typeorm";

export class init1689497099775 implements MigrationInterface {
    name = 'init1689497099775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deposit" ("deposit_id" SERIAL NOT NULL, "deposit_user_id" integer NOT NULL, "deposit_credit" numeric DEFAULT '0', "deposit_debit" numeric DEFAULT '0', "deposit_item_id" integer, "deposit_desc" text, "deposit_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_09011c3a488508ec9ffd4e8bc26" PRIMARY KEY ("deposit_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "user_email" text NOT NULL, "user_password" text NOT NULL, "user_balance" numeric DEFAULT '0', "user_last_login" TIMESTAMP WITH TIME ZONE, "user_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_65d72a4b8a5fcdad6edee8563b" ON "user" ("user_email") `);
        await queryRunner.query(`CREATE TABLE "item" ("item_id" SERIAL NOT NULL, "item_user_id" integer, "item_name" text NOT NULL, "item_start_price" numeric, "item_end_price" numeric, "item_time_window" text, "item_created_by" integer NOT NULL, "item_status" text NOT NULL DEFAULT 'Pending', "item_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "item_published_at" TIMESTAMP WITH TIME ZONE, "item_expired_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_8b21aa99996acd87a00c0ce553a" PRIMARY KEY ("item_id"))`);
        await queryRunner.query(`CREATE TABLE "bid" ("bid_id" SERIAL NOT NULL, "bid_item_id" integer NOT NULL, "bid_user_id" integer NOT NULL, "bid_price" numeric NOT NULL, "bid_finished" boolean NOT NULL DEFAULT false, "bid_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8119bf86e5b937fdf2140e28e8f" PRIMARY KEY ("bid_id"))`);
        await queryRunner.query(`ALTER TABLE "deposit" ADD CONSTRAINT "FK_d39030d414480cccf634f934999" FOREIGN KEY ("deposit_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deposit" ADD CONSTRAINT "FK_eb60de7ae98b3b926c208fa8746" FOREIGN KEY ("deposit_item_id") REFERENCES "item"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_05892a4689fa896943d3c4e321f" FOREIGN KEY ("item_user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_281db83a516776a489be9b4423a" FOREIGN KEY ("item_created_by") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_541cf7f3dea228ab65756c861e8" FOREIGN KEY ("bid_item_id") REFERENCES "item"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_65026f074ced2904acfca9be109" FOREIGN KEY ("bid_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_65026f074ced2904acfca9be109"`);
        await queryRunner.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_541cf7f3dea228ab65756c861e8"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_281db83a516776a489be9b4423a"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_05892a4689fa896943d3c4e321f"`);
        await queryRunner.query(`ALTER TABLE "deposit" DROP CONSTRAINT "FK_eb60de7ae98b3b926c208fa8746"`);
        await queryRunner.query(`ALTER TABLE "deposit" DROP CONSTRAINT "FK_d39030d414480cccf634f934999"`);
        await queryRunner.query(`DROP TABLE "bid"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65d72a4b8a5fcdad6edee8563b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "deposit"`);
    }

}
