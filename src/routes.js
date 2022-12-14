const express = require('express');

const CursoController = require('./controllers/CursoController');
const AlunoController = require('./controllers/AlunoController');
const TopicoController = require('./controllers/TopicoController');
const TrajetoController = require('./controllers/TrajetoController');
const MaterialCursoController = require('./controllers/MaterialCursoController');
const IndicadoresController = require('./controllers/IndicadoresController');
const PerguntaController = require('./controllers/PerguntaController');
const routes = express.Router();

routes.post('/curso', CursoController.create);
routes.get('/curso', CursoController.getAll);
routes.get('/cursos/batch', CursoController.gerCursoByIds)
routes.get('/curso/:cursoId', CursoController.gerCursoById);
routes.get('/curso/material/:cursoId', CursoController.gerCursoEMaterialById);



routes.post('/aluno', AlunoController.create);
routes.get('/aluno', AlunoController.getAll);
routes.post('/login', AlunoController.login);
routes.post('/aluno/curso', AlunoController.createCursoByAluno);
routes.get('/aluno/curso', AlunoController.getCursoByAluno);
routes.post('/aluno/trajeto', AlunoController.createTrajetoByAluno);
routes.get('/aluno/trajeto', AlunoController.getTrajetoByAluno);
routes.post('/aluno/associate', AlunoController.createCursoAndTrajetoByAluno);
routes.get('/aluno/allInfo/:aluno_email', AlunoController.getCursosETrajetosPorAluno);
routes.post('/curso/finaliza/:aluno_email/:curso_id', AlunoController.finalizarCursoByAluno);


routes.post('/trajeto/finaliza/:aluno_email/:trajeto_id', AlunoController.finalizarTrajetoByAluno);


routes.post('/topico', TopicoController.create);
routes.get('/topico', TopicoController.getAll);

routes.post('/trajeto', TrajetoController.create2);
routes.get('/trajeto', TrajetoController.getAll);
routes.get('/trajeto/:trajetoId', TrajetoController.getTrajetoById);


routes.post('/material-curso', MaterialCursoController.create);
routes.get('/material-curso', MaterialCursoController.getAll);

routes.get('/material-curso/:id', MaterialCursoController.getById);

routes.get('/indicadores', IndicadoresController.gerarIndicadores);


routes.post('/pergunta/new', PerguntaController.createPergunta);
routes.post('/pergunta/curso', PerguntaController.associarPerguntasAoCurso);
routes.get('/pergunta', PerguntaController.getAll);
routes.get('/perguntas/curso/:cursoId', PerguntaController.getPerguntasDoCurso);

module.exports = routes