const connection = require('../database/connection');

const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { nome, link, ordem, curso_id } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('material_curso').insert({
            id,
            nome,
            link,
            ordem,
            curso_id
        });
        return res.json({ id });
    },

    async getAll(req, res) {
        const materialCurso = await connection('material_curso').select('*');
        return res.json(materialCurso);
    },

    async getById(req, res) {
        const cursoId = req.params.id;
        const materialCurso = await connection('material_curso').where({ curso_id: cursoId }).select('*');
        return res.json(materialCurso);
    }
}