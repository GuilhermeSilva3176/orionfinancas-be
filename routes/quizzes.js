const express = require('express');
const router = express.Router();
const quizzesController = require('../controllers/quizzesController.js');
const authMiddleware = require('../middlewares/auth.js');

// Admin: Catalog + status management
router.get('/admin/catalog', authMiddleware.verifyToken, quizzesController.getAdminCatalog);
router.put('/admin/trails/:trailId/status', authMiddleware.verifyToken, quizzesController.updateTrailStatus);
router.put('/admin/modules/:moduleId/status', authMiddleware.verifyToken, quizzesController.updateModuleStatus);
router.put('/admin/quizzes/:quizId/status', authMiddleware.verifyToken, quizzesController.updateQuizStatus);

// Admin/User: List all quizzes
router.get('/', authMiddleware.verifyToken, quizzesController.getAllQuizzes);

// User: Get single quiz
router.get('/:id', authMiddleware.verifyToken, quizzesController.getQuizById);

// User: Complete quiz
router.post('/complete', authMiddleware.verifyToken, quizzesController.completeQuiz);

module.exports = router;
