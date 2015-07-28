var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página principal
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

 // Definición de rutas de /quizzes
router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizzes/new',                  quizController.new);
router.post('/quizzes/create',              quizController.create);

// Página de autor
router.get('/author', function(req, res, next) {
  res.render('author', { name: 'Jesús Ángel Pérez-Roca Fernández', photo: '../images/author.png' });
});

module.exports = router;
