const express = require('express');
const { createSoftware, getSoftwareList } = require('../controllers/softwareController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('Admin'), createSoftware);
router.get('/', getSoftwareList);
module.exports = router;
