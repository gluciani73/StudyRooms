import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios"
import NavBar from "../NavBar/NavBar"
import { useNavigate } from "react-router-dom"
import "./Donations.css"

const stripePromise = loadStripe("pk_test_51LhhasEmp5dtE89LxdcOsJb9GWkTB6Zjcq9fl5Igf3CcmhwJs01BuokKEfJnF9LTbhSRjSyBoweMaUvMtBW3ZlWO00R9ldzf45")



const CheckoutForm = () => {

    const history = useNavigate()
    const element = useElements()
    const stripe = useStripe()
    let cantidad

    function handleChange(e) {
        cantidad = e.target.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: element.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod
            console.log(cantidad)
            try {
                const { data } = await axios.post("/payments/checkout", {
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

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="inputs">
                    <input className="form-control" type="number" value={cantidad} onChange={e => handleChange(e)} placeholder="Cantidad a donar! (dolares)"></input>
                    <button className="btn btn-primary rounded-pill">
                        Donar!
                    </button>
                </div>
            </form>
        </div>
    )
}
const Donations = () => {
    return (
        <div>
            <NavBar />
            <div className="Donaciones">
                <div className="BackgroundText">
                    <h1>Gracias por tu donacion, <small class="text-muted">Tu donacion sera utilizada para mejorar la calidad y servicios de la pagina web</small></h1>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default Donations