const { Router } = require('express')
const router = Router()
const { searchQuestion } = require('../controllers/searchController')

// /search/...

router.get('/', searchQuestion)

module.exports = router