const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {
    async createPergunta(req, res) {
        const { pergunta, a, b,c, d,e , correta, topico, dificuldade } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('pergunta').insert({
            id,
            pergunta,
            a,
            b,
            c,
            d,
            e,
            correta
        });
        return res.status(201).send('');
    },
    async associarPerguntasAoCurso(req, res) {
        const { perguntasIds, cursosId } = req.body;
        
        for (const perguntaId of perguntasIds) {
            await connection('curso_has_pergunta').insert({
                curso_id: cursosId,
                pergunta_id: perguntaId,
            });
        }
        
        return res.status(201).send('');
    },
    async getAll(req, res) {
        const perguntas = await connection('pergunta').select('*');
        return res.json(perguntas);
       
    },

    async getPerguntasDoCurso(req, res) {
        const cursoId = req.params.cursoId
    
        console.log(req.body);
        const perguntas = await connection('curso_has_pergunta').innerJoin('pergunta', 'curso_has_pergunta.pergunta_id', 'pergunta.id').where({'curso_has_pergunta.curso_id': cursoId}).select('*');
        
        return res.json(perguntas);
    },
}