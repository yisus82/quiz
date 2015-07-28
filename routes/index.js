var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizzes',                      quizController.index);
router.get('/quizzes/:quizId(\\d+)',        quizController.show);
router.get('/quizzes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res, next) {
  res.render('author', { name: 'Jesús Ángel Pérez-Roca Fernández', photo: '../images/author.png' });
});

module.exports = router;
