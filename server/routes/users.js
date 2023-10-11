const express = require('express')
const { getUsers,deleteUser,updateUser } = require('../controllers/users');
const { protect } = require('../middleware/checkAuth');

const router = express.Router()

router.route('/get-users').get(protect,getUsers);
router.route('/delete').delete(protect,deleteUser);
router.route('/update').put(protect,updateUser);

module.exports = router