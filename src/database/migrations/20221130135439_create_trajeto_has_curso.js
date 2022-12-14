exports.up = function(knex) {
    return knex.schema.createTable('trajeto_has_curso', function (table) {
        table.string('trajeto_id');
        table.string('curso_id');
        table.integer('ordem')
        table.primary(['trajeto_id', 'curso_id']);
        
        table.foreign('trajeto_id').references('id').inTable('trajeto')
        table.foreign('curso_id').references('id').inTable('curso')
    })
};
exports.down = function(knex) {
    return knex.schema.dropTable('trajeto_has_curso');
};
