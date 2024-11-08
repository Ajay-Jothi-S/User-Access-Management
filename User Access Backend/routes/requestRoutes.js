const express = require('express');
const { submitRequest, approveRequest, rejectRequest, getPendingRequests } = require('../controllers/requestController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('Employee'), submitRequest);
router.put('/:id/approve', authMiddleware, roleMiddleware('Manager'), approveRequest);
router.put('/:id/reject', authMiddleware, roleMiddleware('Manager'), rejectRequest);
router.get('/pending', authMiddleware, roleMiddleware('Manager'), getPendingRequests);
module.exports = router;
