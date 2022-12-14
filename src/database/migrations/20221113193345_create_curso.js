exports.up = function (knex) {
    return knex.schema.createTable('curso', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('dificuldade').notNullable();
        table.string('trajeto_id');
        table.string('topico_nome').notNullable();
        table.foreign('topico_nome').references('nome').inTable('topico');
        table.string('descricao').notNullable();
        table.timestamp('created_at');
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('curso');
};
