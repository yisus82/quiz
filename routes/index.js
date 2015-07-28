var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

// Página principal
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId

 // Definición de rutas de /quizzes
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new', 				    sessionController.loginRequired, quizController.new);
router.post('/quizzes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',                     commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',              		  commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// Página de autor
router.get('/author', function(req, res, next) {
  res.render('author', { name: 'Jesús Ángel Pérez-Roca Fernández', photo: '../images/author.png' });
});

module.exports = router;
