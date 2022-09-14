import React from "react"
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios"
import NavBar from "./NavBar"

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
            const {id} = paymentMethod
            try {
                const {data} = await axios.post("http://localhost:3001/payment/checkout", {
                id,
                amount: 1000
            })
            console.log(data)
            element.getElement(CardElement).clear()
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button>
                Donar 10 dolares!
            </button>
        </form>
    )
}
const Donations = () =>{
    return (
        <div>
        <NavBar/>
        <Elements stripe={stripePromise}>
            <h1>Donaciones</h1>
            <CheckoutForm/>
        </Elements>
        </div>
    )
}

export default Donations