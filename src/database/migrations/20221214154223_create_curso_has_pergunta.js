
exports.up = function(knex) {

    return knex.schema.createTable('curso_has_pergunta', function (table) {
    table.string('curso_id');
    table.string('pergunta_id');
    table.foreign('curso_id').references('id').inTable('curso');
    table.foreign('pergunta_id').references('id').inTable('pergunta');
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('curso_has_pergunta');
};
