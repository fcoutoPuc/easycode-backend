exports.up = function(knex) {
    return knex.schema.createTable('aluno_has_trajeto', function (table) {
        table.string('aluno_email');
        table.string('trajeto_id');
        table.boolean('finalizado').defaultTo(false);
        table.primary(['aluno_email', 'trajeto_id']);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('aluno_has_trajeto');
};
