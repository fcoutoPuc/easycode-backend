
exports.up = function(knex) {
    return knex.schema.createTable('topico', function (table) {
        table.string('nome').primary();
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('topico');
};
