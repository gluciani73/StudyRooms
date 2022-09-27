const { Router } = require('express');
const router = Router();
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController.js')

// /categories/...
router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


module.exports = router;
