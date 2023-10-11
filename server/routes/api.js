const express = require('express')
const { getAPI,updateAPI,addAPI } = require('../controllers/api');
const { protect } = require('../middleware/checkAuth');

const router = express.Router()

router.route('/get-api').get(protect,getAPI);
router.route('/api-update').put(protect,updateAPI);

module.exports = router