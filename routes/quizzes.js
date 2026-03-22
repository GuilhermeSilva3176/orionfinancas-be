const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quizzesController.js');
const authMiddleware = require('../middlewares/auth.js');

// Admin/User: List all quizzes
router.get('/', authMiddleware.verifyToken, quizzesController.getAllQuizzes);

// User: Get single quiz
router.get('/:id', authMiddleware.verifyToken, quizzesController.getQuizById);

// User: Complete quiz
router.post('/complete', authMiddleware.verifyToken, quizzesController.completeQuiz);

module.exports = router;
