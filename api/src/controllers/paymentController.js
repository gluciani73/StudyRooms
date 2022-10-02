// pasarela de pago
//router.use(express.json())
const { User } = require('../db.js')

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

        //---------------------------------------------
        /////////////////////////////////////////////////////////
        return res.send({ message: "Pago realizado" })
    } catch (error) {
        console.log(error)
        return res.json({ message: error.raw.message })
    }
}

module.exports = { checkout }