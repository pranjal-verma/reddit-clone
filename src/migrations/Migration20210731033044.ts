import { Migration } from '@mikro-orm/migrations';

export class Migration20210731033044 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comment" drop constraint if exists "comment_title_check";');
    this.addSql('alter table "comment" alter column "title" type varchar(255) using ("title"::varchar(255));');
  }

}
