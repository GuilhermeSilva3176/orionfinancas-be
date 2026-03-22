const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessonsController.js');
const authMiddleware = require('../middlewares/auth.js');

// User: Mark lesson as complete
router.post('/complete', authMiddleware.verifyToken, lessonsController.completeLesson);

// User: Get lesson progress
router.get('/progress', authMiddleware.verifyToken, lessonsController.getLessonProgress);

module.exports = router;
