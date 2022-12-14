
 exports.up = function(knex) {
    return knex.schema.createTable('aluno', function(table) {
        table.string('email').primary();
        table.string('nome').notNullable();
        table.string('telefone').notNullable();
        table.string('senha').notNullable();
    })
  };
  

  exports.down = function(knex) {
    return knex.schema.dropTable('aluno');
  };
  