exports.up = function (knex) {
  return knex.schema.createTable('aluno_has_curso', function (table) {
    table.string('aluno_email');
    table.string('curso_id');
    table.boolean('finalizado').defaultTo(false);
    table.primary(['aluno_email', 'curso_id'])
    table.foreign('aluno_email').references('email').inTable('aluno');
    table.foreign('curso_id').references('id').inTable('curso');
    table.timestamp('created_at');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('aluno_has_curso');
};
