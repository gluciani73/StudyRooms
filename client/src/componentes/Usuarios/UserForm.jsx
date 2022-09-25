
import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {createUserAction} from '../../Controllers/Actions/userAction'
import "../../CssAdicional/Home.css"
import { registerOnOff} from '../../Controllers/Actions/loginActions'
import sweetalert from 'sweetalert'

export default function CreateUser(){
    const dispatch =useDispatch();

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]{3,8}$/.test(data.userName)) || data.userName.length < 3 ) errors.userName = "Ingrese un nombre de usuario que contenga entre 3 y 8 caracteres"
        if(!(/^[a-zA-Z]{3,15}$/.test(data.firstName)) || data.firstName.length < 3 ) errors.firstName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        if(!(/^[a-zA-Z]{3,15}$/.test(data.lastName)) || data.lastName.length < 3 ) errors.lastName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        if(!(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(data.email)))errors.email = "Ingrese un correo valido"
        if(data.password.length < 6 || data.password.length > 16) errors.password = "Ingrese una contraseña que contenga entre 6 y 16 caracteres"
        if(data.password !== data.ConfirmPassword)errors.ConfirmPassword = "Las contraseñas no coinciden"

        return errors
    }

    // useEffect(()=>{
    //     dispatch(getUserAction())
    // },[dispatch])

    const [formError, setFormError] = useState({})


    const [newUser, setNewUser] = useState({
    userName:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    avatar:""

   });

    const [checked, setChecked] = useState({});
    
    function handleChangeCheckbox(e){
        setChecked(!checked)
    }

    function handleChange(e){
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
        setFormError(validate({
            ...newUser,
            [e.target.name]: e.target.value
        }))
    }


    function showAlert(){
        sweetalert({
            title:"Terminos y Condiciones",
            text: `Es requisito necesario para la adquisición de los servicios que se ofrecen en este sitio, que lea
            y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de
            nuestros servicios implicará que usted ha leído y aceptado los Términos y Condiciones de Uso
            en el presente documento. Todas los servicios que son ofrecidos por nuestro sitio web
            pudieran ser creadas, cobradas, enviadas o presentadas por una página web tercera y en tal
            caso estarían sujetas a sus propios Términos y Condiciones. En algunos casos, para adquirir
            un servicio, será necesario el registro por parte del usuario, con ingreso de datos personales
            fidedignos y definición de una contraseña.`
    })
    }

    function handleRegister(e){
        e.preventDefault()
        dispatch(registerOnOff())
      }
    function handleSubmit(e){
        e.preventDefault();

        if(!checked) {
            alert("Por favor indica que aceptas los Términos y Condiciones");
            return false
        }
       

            e.preventDefault();
            dispatch(createUserAction(newUser))
            setNewUser({
                userName:"",
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                avatar:""
            })
            alert("Usuario creado correctamente")

        }
console.log(newUser)
        return (
            <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
                
                <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Registrate</h1>

                    <div className=''>
                    <label htmlFor="NickName">NickName</label>
                        <input className='d-block  m-1 border-0 form-control'  type="text" value={newUser.userName} id='userName' name='userName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    {formError.userName && <span><strong>{formError.userName}</strong></span>}
                   </div>

                    <div>

                        <label htmlFor="firstName">nombre</label>
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                        {formError.firstName && <span><strong>{formError.firstName}</strong></span>}
                    </div>



                    <div>
                        <label htmlFor="lastName">Segundo nombre</label>                
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.lastName} placeholder='Last Name' id='lastName' name='lastName'onChange={(e)=>handleChange(e)} required/>
                        {formError.lastName && <span><strong>{formError.lastName}</strong></span>}

                    </div>

                    <div>

                        <label htmlFor="email">Email</label>                        
                        <input className='d-block  m-1 border-0 form-control' type="email" value={newUser.email} placeholder='email@example.com'name='email' id='email' autoComplete='off' onChange={(e)=>handleChange(e)} required/>
                        {formError.email && <span><strong>{formError.email}</strong></span>}
                    </div>


                    <div>
                        <label htmlFor="password">Contraseña</label>                     
                        <input className='d-block  m-1 border-0 form-control' type="password"  value={newUser.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>
                        {formError.password && <span><strong>{formError.password}</strong></span>}
                    </div>

                    <div>
                        <label htmlFor="ConfirmPassword">Repetir Contraseña</label>
                        <input className='d-block  m-1 border-0 form-control' type="text"  value={newUser.ConfirmPassword} name='ConfirmPassword' id='ConfirmPasswordoto' placeholder='ConfirmPassword' onChange={(e)=>handleChange(e)} required/>
                        {formError.ConfirmPassword && <span><strong>{formError.ConfirmPassword}</strong></span>}
                    </div>




                    <div>
                        <label htmlFor="foto">foto</label>
                        <input type="text"  value={newUser.avatar} name='avatar' id='foto' placeholder='foto' onChange={(e)=>handleChange(e)} required/>
                    </div>


                    <div >
                        <label htmlFor="acceptT" >Acepto los <button onClick={()=>showAlert()} style={{ border:'none', backgroundColor:"white", color:"blue" }}>términos y condiciones</button> del servicio</label>
                        <input   type="checkbox"  name="acceptT" id="acceptT" checked={checked} onChange={handleChangeCheckbox}/>
                    </div>

                   <button type='submit' value='Register'>Registrarse</button>
                   <button type="button" onClick={ (e) => handleRegister(e) } className="btn btn-primary m-2">Login</button>


               </form>
        </div> 
            );


}

