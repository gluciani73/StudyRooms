const { Router } = require('express');
const router = Router();
const {getCategories} = require('../controllers/categoryController.js')

// /categories/...
router.get('/', getCategories);

module.exports = router;
