const connection = require('../database/connection');
const { get } = require('../routes');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { nome, autor,topico_nome } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        

        await connection('trajeto').insert({
            id,
            nome,
            autor,
            topico_nome
        });
        return res.json({ id });
    },

    async create2(req, res) {
        const { nome, autor,topico_nome, cursos, dificuldade, descricao } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        

        await connection('trajeto').insert({
            id,
            nome,
            autor,
            topico_nome,
            dificuldade,
            descricao
        });
        for (const eachCurso of cursos) {
            await connection('trajeto_has_curso').insert({
                trajeto_id: id,
                curso_id: eachCurso.id_curso,
                ordem: eachCurso.ordem,
            });
        }
        return res.json({ id });
    },

    async getAll(req, res) {
        const trajeto = await connection('trajeto').select('*');
        return res.json(trajeto);
    },

    async getTrajetoById(req, res) {
        const trajetoId = req.params.trajetoId
        const trajeto = await connection('trajeto').where({ id: trajetoId }).select('*');
        const cursosDoTrajeto = await connection('trajeto_has_curso').innerJoin('curso', 'trajeto_has_curso.curso_id', 'curso.id').where({'trajeto_has_curso.trajeto_id': trajetoId}).select('*');
        console.log(cursosDoTrajeto);
        let response = trajeto[0];
        response.cursos = cursosDoTrajeto;
        return res.json(response);
    }
}