import React from "react"
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51LhhasEmp5dtE89LxdcOsJb9GWkTB6Zjcq9fl5Igf3CcmhwJs01BuokKEfJnF9LTbhSRjSyBoweMaUvMtBW3ZlWO00R9ldzf45")



const CheckoutForm = ()=>{

    const element = useElements()
    const stripe = useStripe()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: element.getElement(CardElement)
        })
        if(!error){
            console.log(paymentMethod)
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button>
                Donar!
            </button>
        </form>
    )
}
const Donations = () =>{
    return (
        <Elements stripe={stripePromise}>
            <h1>Donaciones</h1>
            <CheckoutForm/>
        </Elements>
    )
}

export default Donations