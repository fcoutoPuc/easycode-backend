const connection = require('../database/connection');


module.exports = {
    async create(req, res) {
        const { email, nome, telefone, senha } = req.body;

        await connection('aluno').insert({
            email,
            nome,
            telefone,
            senha,
        });
        return res.json({ email });
    },

    async getAll(req, res) {
        const aluno = await connection('aluno').select('*');
        return res.json(aluno);
    },

    async login(req, res) {
        const { email, senha } = req.body;
        const aluno = await connection('aluno').where({ email: email, senha: senha }).select('*');
        if (aluno.length !== 0) {
            res.status(200).json({ email: aluno[0].email, nome: aluno[0].nome });
        } else {
            res.status(403).json({ message: 'acesso negado' });
        }
    },

    async getCursosETrajetosPorAluno(req, res) {
        const aluno_email = req.params.aluno_email;

        let response = {};
        try {
            const cursoIds = await connection('aluno_has_curso').where({
                aluno_email: aluno_email,
            }).select('*');
            const onlyIdsFromCurso = cursoIds.map(it => it.curso_id);

            const trajetosIds = await connection('aluno_has_trajeto').where({
                aluno_email: aluno_email,
            }).select('*');
            const onlyIdsFromTrajeto = trajetosIds.map(it => it.trajeto_id);
            const curso = await connection('curso').select('*').whereIn('id', onlyIdsFromCurso);
            curso.forEach(c => {
                console.log(cursoIds);
                 const index = cursoIds.findIndex(el => el.curso_id === c.id);
                 console.log(index);
                 if (index >= 0) {
                     c.finalizado = cursoIds[index].finalizado
                     console.log('fii');
                 }
            })
            response.cursos = curso
            const trajeto = await connection('trajeto').select('*').whereIn('id', onlyIdsFromTrajeto);
            trajeto.forEach(c => {
                console.log(trajetosIds);
                 const index = trajetosIds.findIndex(el => el.trajeto_id === c.id);
                 console.log(index);
                 if (index >= 0) {
                     c.finalizado = trajetosIds[index].finalizado
                     console.log('fii');
                 }
            })
            response.trajeto = trajeto
            return res.json(response);
        } catch (error) {
            throw error;
        }

    },

    async createCursoByAluno(req, res) {
        const { aluno_email, curso_id } = req.body;
        await connection('aluno_has_curso').insert({
            aluno_email,
            curso_id,
        });
        return res.status(201).send('');
    },

    async finalizarCursoByAluno(req, res) {
        const cursoId = req.params.curso_id;
        const alunoEmail = req.params.aluno_email;
        await connection('aluno_has_curso').where({ curso_id: cursoId, aluno_email: alunoEmail }).update(
            'finalizado', true
        )
        return res.status(200).send('');
    },

    async finalizarTrajetoByAluno(req, res) {
        const trajetoId = req.params.trajeto_id;
        const alunoEmail = req.params.aluno_email;
        await connection('aluno_has_trajeto').where({ trajeto_id: trajetoId, aluno_email: alunoEmail }).update(
            'finalizado', true
        )
        return res.status(200).send('');
    },

    async createCursoAndTrajetoByAluno(req, res) {
        const { aluno_email, curso_ids, trajeto_ids } = req.body;
        const cursosAlunosJaTem = await connection('aluno_has_curso')
            .where({ aluno_email }).select('curso_id');
        const trajetosAlunosJaTem = await connection('aluno_has_trajeto')
            .where({ aluno_email }).select('trajeto_id');
        console.log(cursosAlunosJaTem);
        if (curso_ids.length !== 0) {
            for (let curso_id of curso_ids) {
                const jaFoiAdicionado = cursosAlunosJaTem.findIndex(each => each.curso_id === curso_id);
                if (jaFoiAdicionado === -1) {
                    await connection('aluno_has_curso').insert({
                        aluno_email,
                        curso_id,
                    });
                }
            }
        }
        if (trajeto_ids.length !== 0) {
            for (let trajeto_id of trajeto_ids) {
                const jaFoiAdicionado = trajetosAlunosJaTem.findIndex(each => each.trajeto_id === trajeto_id);
                if (jaFoiAdicionado === -1) {
                    await connection('aluno_has_trajeto').insert({
                        aluno_email,
                        trajeto_id,
                    });
                }
            }
        }
        return res.status(201).send('');


    },

    async getCursoByAluno(req, res) {
        const { aluno_email } = req.body;
        const result = await connection('aluno_has_curso').where({
            aluno_email: aluno_email,
        }).select('*');
        return res.status(200).send(result);
    },

    async createTrajetoByAluno(req, res) {

        const date = new Date();
        let created_at = `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`

        const { aluno_email, trajeto_id } = req.body;
        await connection('aluno_has_trajeto').insert({
            aluno_email,
            trajeto_id,
            created_at
        });
        return res.status(201).send('');
    },

    async getTrajetoByAluno(req, res) {
        const { aluno_email } = req.body;
        const result = await connection('aluno_has_trajeto').where({
            aluno_email: aluno_email,
        }).select('*');
        return res.status(200).send(result);
    }

}