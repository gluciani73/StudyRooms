const { Router } = require('express')
const router = Router()
const { searchQuestion, searchAnswer } = require('../controllers/searchController')

// /search/...

router.get('/', searchQuestion)
router.get('/answer', searchAnswer)
router.get('/question', searchQuestion)

module.exports = router