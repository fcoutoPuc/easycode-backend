exports.up = function (knex) {
    return knex.schema.createTable('trajeto', function (table) {
        table.string('id').primary();
        table.string('nome');
        table.string('autor');
        table.string('topico_nome').notNullable();
        table.string('dificuldade').notNullable();
        table.string('descricao').notNullable();
        table.foreign('topico_nome').references('nome').inTable('topico');
        table.timestamp('created_at');
    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('trajeto');
};

