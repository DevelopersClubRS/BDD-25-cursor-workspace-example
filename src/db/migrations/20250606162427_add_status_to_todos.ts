import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('todos', table => {
        table.string('status').notNullable().defaultTo('pending');
        table.dropColumn('completed');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('todos', table => {
        table.boolean('completed').notNullable().defaultTo(false);
        table.dropColumn('status');
    });
}

