
exports.up = function(knex) {
    return knex.schema.createTable('topico', function (table) {
        table.string('nome').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('topico');
};
