
exports.up = function(knex) {
    return knex.schema.createTable('pergunta', function (table) {
        table.string('id').primary();
        table.string('pergunta').notNullable();
        table.string('a').notNullable();
        table.string('b').notNullable();
        table.string('c').notNullable();
        table.string('d').notNullable();
        table.string('e').notNullable();
        table.string('correta').notNullable();
    
    
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('pergunta');
};
