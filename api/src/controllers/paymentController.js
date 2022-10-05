// pasarela de pago
//router.use(express.json())
const { User } = require('../db.js')
const jwt = require('jsonwebtoken')

const {AUTH_SECRET} = require('../CONSTANTS.js')
//esto es de la pasarela de pago

const checkout = async (req, res) => {
    const Stripe = require("stripe")
    const stripe = new Stripe("sk_test_51LhhasEmp5dtE89LTANXUW3bFI74zGdEr5LhcWZGe6HcgGy91kP984qGYfFyaZJ9OHaIc82wGotxWrdMHPN1tf6j00i1FVnNqT")

    const { id: paymentId, amount } = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "USD",
            description: "Donacion",
            payment_method: paymentId,
            confirm: true
        })
        console.log(payment)
        ///////////////////////////////////////////////////////////////////////////
        // registro en DB de amount y cambio a premium
        const userReqInfo = req.user;
        console.log('userReqInfo: ', userReqInfo)
        const userExist = await User.findByPk(userReqInfo.id);
        if (!userExist) return res.status(404).json({ data: null, error: "no se encontro usuario con ese id" })

        let newAmount = parseInt(amount);
        amount ?
            newAmount = parseInt(userExist.amountDonated) + parseInt(amount)
            : newAmount = parseInt(userExist.amountDonated)

        await User.update({
            amountDonated: newAmount,
            isPremium: true
        },
            {
                where: { id: userReqInfo.id }
            })

            const user = await User.findByPk(userReqInfo.id);
            const dataToSend = {
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                active: user.active,
                isAdmin: user.isAdmin,
                isPremium: user.isPremium
            }

            const token = jwt.sign(dataToSend, AUTH_SECRET, { expiresIn: 86400 })

        //---------------------------------------------
        /////////////////////////////////////////////////////////
        return res.json({ message: "Pago realizado", error:null, token })
    } catch (error) {
        console.log(error)
        return res.json({ message: error.raw.message })
    }
}

module.exports = { checkout }