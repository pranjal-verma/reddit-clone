import { Migration } from '@mikro-orm/migrations';

export class Migration20210801052721 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("_id" serial primary key, "username" varchar(255) not null, "password" text not null, "_created_at" timestamptz(0) not null, "_updated_at" timestamptz(0) not null);');
  }

}
