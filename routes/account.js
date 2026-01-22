const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/auth');
const express = require('express'); 

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/profile', accountController.getProfile);
router.put('/deactivateProfile', accountController.deactivateAccount);
router.put('/updateAccount', accountController.updateAccount);

module.exports = router;