exports.up = function (knex) {
    return knex.schema.createTable('material_curso', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('link').notNullable();
        table.integer('ordem').notNullable();
        table.string('curso_id').notNullable();
        table.foreign('curso_id').references('id').inTable('curso');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('material_curso');
};
