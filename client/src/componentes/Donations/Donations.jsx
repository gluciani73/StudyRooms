import React from "react"
import {loadStripe} from "@stripe/stripe-js"
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios"
import NavBar from "../NavBar/NavBar"
import {useNavigate} from "react-router-dom"

const stripePromise = loadStripe("pk_test_51LhhasEmp5dtE89LxdcOsJb9GWkTB6Zjcq9fl5Igf3CcmhwJs01BuokKEfJnF9LTbhSRjSyBoweMaUvMtBW3ZlWO00R9ldzf45")



const CheckoutForm = ()=>{
    
    const history = useNavigate()
    const element = useElements()
    const stripe = useStripe()
    let cantidad 
    
    function handleChange(e) {
        cantidad = e.target.value
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: element.getElement(CardElement)
        })
        if(!error){
            const {id} = paymentMethod
            console.log(cantidad)
            try {
                const {data} = await axios.post("http://localhost:3001/payments/checkout", {
                id,
                amount: cantidad * 100
            })
            console.log(data)
            const errorData = Object.entries(data)
            const errorAlert = errorData[0].toString().slice(8)
            alert(errorAlert)
            element.getElement(CardElement).clear()
            history("/home")
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <CardElement/>
            <button>
                Donar!
            </button>
            <input type="number" value={cantidad} onChange={e => handleChange(e)} placeholder="Cantidad a donar! (dolares)"></input>
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