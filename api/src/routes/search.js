const { Router } = require('express')
const router = Router()
const { searchQuestion, searchAnswer, searchQA } = require('../controllers/searchController')

// /search/...

router.get('/', searchQA)
router.get('/answer', searchAnswer)
router.get('/question', searchQuestion)

module.exports = router