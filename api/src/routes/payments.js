const {Router} = require('express')
const router = Router()

const {checkout} = require('../controllers/paymentController.js')

// /payments/...
router.post("/checkout", checkout)

module.exports = router