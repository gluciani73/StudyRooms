const { Router } = require('express')
const router = Router()
const { searchQuestion, searchAnswer, searchQA, searchCategory } = require('../controllers/searchController')

// /search/...

router.get('/', searchQA)
router.get('/answer', searchAnswer)
router.get('/question', searchQuestion)
router.get('/category', searchCategory)

module.exports = router