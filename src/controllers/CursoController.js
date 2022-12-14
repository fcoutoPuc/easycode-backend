const connection = require('../database/connection');

const crypto = require('crypto');
async function buidResponse(response, materialCurso) {
    response.material_curso = []
    response.material_curso = response.material_curso.concat(materialCurso);
    console.log(response);
    return response;
}

module.exports = {

    async create(req, res) {
        const date = new Date();
        const { nome, dificuldade, topico_nome, material_curso, descricao } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        let created_at = `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`
        try {
            await connection('curso').insert({
                id,
                nome,
                dificuldade,
                topico_nome,
                descricao,
                created_at
            });
        } catch (e) {
            console.log(e);
            throw e;
        }

        for (let eachMaterial of material_curso) {
            let extractVideoId;
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = eachMaterial.link.match(regExp);
            if (match && match[2].length == 11) {
                console.log('achou');
                extractVideoId = match[2];
                console.log(match[2]);
                // return match[2];
            }
            if (extractVideoId) {
                eachMaterial.link = extractVideoId;

            }
            const materialCursoId = crypto.randomBytes(4).toString('HEX');
            await connection('material_curso').insert({
                id: materialCursoId,
                nome: eachMaterial.nome,
                link: eachMaterial.link,
                ordem: eachMaterial.ordem,
                curso_id: id
            });
        }

        return res.json({ id });
    },

    async getAll(req, res) {
        const cursos = await connection('curso').select('*');
        return res.json(cursos);
    },


    async gerCursoByIds(req, res) {
        const cursoId = req.body.cursoIds
        console.log(cursoId);
        try {
            const curso = await connection('curso').select('*').whereIn('id', cursoId);
            return res.json(curso);
        } catch (error) {
            throw error;
        }

    },

    async gerCursoById(req, res) {
        const cursoId = req.params.cursoId
        const curso = await connection('curso').where({ id: cursoId }).select('*');
        return res.json(curso);
    },

    async gerCursoEMaterialById(req, res) {
        const cursoId = req.params.cursoId
        const curso = await connection('curso').where({ id: cursoId }).select('*');
        const materialCurso = await connection('material_curso').where({ curso_id: cursoId }).select('*');
        let response = curso[0];
        let result = await buidResponse(response, materialCurso);
        return res.json(result);
    }
}