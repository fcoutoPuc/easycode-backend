const connection = require('../database/connection');

module.exports = {
    async gerarIndicadores(req, res) {
        const dateSevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        let sevenDate = `${dateSevenDaysAgo.getFullYear()}-${dateSevenDaysAgo.getMonth() + 1}-${dateSevenDaysAgo.getDate()}`
        const count = await connection('curso').select('*')
            .where('created_at', '>=', dateSevenDaysAgo);
        const indicador_cursos_criados = count.length;


        const countTrajeto = await connection('trajeto').select('*')
            .where('created_at', '>=', dateSevenDaysAgo);
        const indicador_trajetos_criados = countTrajeto.length;
        
        const countAlunoHasTrajeto = await connection('aluno_has_trajeto').select('*')
            .where('created_at', '>=', dateSevenDaysAgo)
            .where('finalizado', true);
        const indicador_aluno_trajeto = countAlunoHasTrajeto.length;        

        const countAlunoHasCurso = await connection('aluno_has_curso').select('*')
            .where('created_at', '>=', dateSevenDaysAgo)
            .where('finalizado', true);
        const indicador_aluno_curso = countAlunoHasCurso.length;        
        
        return res.json({ indicador_cursos_criados, indicador_trajetos_criados, indicador_aluno_trajeto, indicador_aluno_curso });
    }
}