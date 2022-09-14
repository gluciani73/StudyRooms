const {Router} = require('express')
const router = Router()
const {signIn, signUp} = require('../controllers/auth.controller')
//esto es de la pasarela de pago
const Stripe = require("stripe")
const stripe = new Stripe("sk_test_51LhhasEmp5dtE89LTANXUW3bFI74zGdEr5LhcWZGe6HcgGy91kP984qGYfFyaZJ9OHaIc82wGotxWrdMHPN1tf6j00i1FVnNqT")
const express = require("express")

router.post('/auth/signup', signUp)
router.post('/auth/signin', signIn)
// pasarela de pago
router.use(express.json())

router.post("/payment/checkout", async (req, res) => {
    
    const {id, amount} = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description:"Donacion",
            payment_method: id,
            confirm: true
            
        })
        console.log(payment)
        res.send({message: "Pago realizado"})
    } catch (error) {
        console.log(error)
        res.json({message: error.raw.message})
    }
})
module.exports = router