const express = require('express');
const router = express.Router();
const missionsController = require('../controllers/missionsController.js');
const authMiddleware = require('../middlewares/auth.js');

// Admin: CRUD missions
router.post('/', authMiddleware.verifyToken, missionsController.createMission);
router.get('/', authMiddleware.verifyToken, missionsController.getAllMissions);
router.put('/:id', authMiddleware.verifyToken, missionsController.updateMission);
router.delete('/:id', authMiddleware.verifyToken, missionsController.deleteMission);

// User: Mission progress
router.get('/user', authMiddleware.verifyToken, missionsController.getUserMissions);
router.post('/claim', authMiddleware.verifyToken, missionsController.claimReward);

module.exports = router;
