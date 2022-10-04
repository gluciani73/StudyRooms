
import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import {createUserAction} from '../../Controllers/Actions/userAction'
import "../../CssAdicional/Home.css"
import { registerOnOff} from '../../Controllers/Actions/loginActions'
import { useSelector } from "react-redux";
import sweetalert from 'sweetalert'
import axios from 'axios'

export default function CreateUser(){
    const dispatch =useDispatch();
    const errorLog = useSelector((state) => state.userReducer.error)
    function validate(data){
        var errors = {};
        if(!(/^([a-zA-Z0-9_-]){3,10}$/.test(data.userName))) errors.userName = "Puede contener - _ numeros y letras sin espacios"
        if(!(/^[a-zA-Z]{3,15}$/.test(data.firstName)) || data.firstName.length < 3 ) errors.firstName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        if(!(/^[a-zA-Z]{3,15}$/.test(data.lastName)) || data.lastName.length < 3 ) errors.lastName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        if(!(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(data.email)))errors.email = "Ingrese un correo valido"
        if (!/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%"-._;,+*?&]{7,16}[^'\s]+$)/.test(data.password)) errors.password ="La contaseña debe contener al menos una mayuscula un numero y un simbolo y no puede contener espacios"
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
    ConfirmPassword:"",
    avatar:""
   });

    const [checked, setChecked] = useState({});

    const uploadImage = async (e) =>{
        try {
        e.preventDefault()
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "franimages");
    
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dqffvu8gj/image/upload",data
                
        )
        setNewUser({...newUser, avatar:res.data.secure_url})
       
        } catch (error) {
            console.log(error)
        }
        
    }
    
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
                ConfirmPassword:"",
                avatar:""
            })
            alert("Usuario creado correctamente")

        }
        return (
            <div className='d-flex flex-column align-items-center h-auto  position-absolute bg-light'>
                
                <form onSubmit={(e)=> handleSubmit(e)} className="d-flex flex-column  align-items-center text-center">
                <h1>Register</h1>
                {errorLog && <p className="alert alert-danger">{errorLog}</p>}
                    <div>
                        {formError.userName && <p className="alert alert-danger">{formError.userName}</p>}
                        <label htmlFor="NickName">Nickname</label>
                        
                        <input pattern='([a-zA-Z0-9_-]\S){3,10}$' title='El nombre de usuario debe contener entre 3 y 16 caracteres. No puede contener simbolos'  className='d-block  m-1 border-1 form-control'  type="text" value={newUser.userName} id='userName' name='userName' placeholder='Nickname' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>                  
                        
                   </div>

                    <div>
                        {formError.firstName && <p className="alert alert-danger">{formError.firstName}</p>}
                        <label htmlFor="firstName">Name</label>
                        <input pattern='[a-zA-Z]\S{3,15}' title='Solo puede contener letras sin espacios'  className='d-block  m-1 border-1 form-control' type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder='User Name' autoComplete='off'  onChange={(e)=>handleChange(e)} required/>
                    </div>



                    <div>
                        {formError.lastName && <p className="alert alert-danger">{formError.lastName}</p>}
                        <label htmlFor="lastName">Last Name</label>                
                        <input pattern="[a-zA-Z]\S{3,15}" title='No puede contener espacios ni caracteres especiales'  className='d-block  m-1 border-1 form-control' type="text" value={newUser.lastName} placeholder='Last Name' id='lastName' name='lastName'onChange={(e)=>handleChange(e)} required/>
                    </div>

                    <div>
                        {formError.email && <p className="alert alert-danger">{formError.email}</p>}
                        <label htmlFor="email">Email</label>                            
                        <input pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" title="Ingrese un mail valido" className='d-block  m-1 border-1 form-control' type="email" value={newUser.email} placeholder='email@example.com'name='email' id='email' autoComplete='off' onChange={(e)=>handleChange(e)} required/>
                    </div>


                    <div>
                        {formError.password && <p className="alert alert-danger">{formError.password}</p>}
                        <label htmlFor="password">Password</label>                     
                        <input pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{7,16}$" title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico." className='d-block  m-1 border-1 form-control' type="password"  value={newUser.password} name='password' id='password' placeholder='Password'  onChange={(e)=>handleChange(e)} required/>                    
                    </div>

                    <div>
                        {formError.ConfirmPassword && <p className="alert alert-danger">{formError.ConfirmPassword}</p>}
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input className='d-block  m-1 border-1 form-control' type="password"  value={newUser.ConfirmPassword} name='ConfirmPassword' id='ConfirmPasswordoto' placeholder='ConfirmPassword' onChange={(e)=>handleChange(e)} required/>
                    
                    </div>




                    <div>

                        <label htmlFor="Photo">Photo</label>
                        <input type="file"  accept="image/png, image/jpeg"   name='avatar' id='avatar'  onChange={(e)=>uploadImage(e)} required />
                    </div>   
                   

                    <div >
                        <label htmlFor="acceptT" >Acepto los<button onClick={()=>showAlert()} style={{ border:'none', backgroundColor:"white", color:"blue" }}>términos y condiciones</button> del servicio</label>
                        <input type="checkbox"  name="acceptT" id="acceptT" checked={checked} onChange={handleChangeCheckbox}/>
                    </div>

                   <button type='submit' value='Register'  className="btn btn-primary m-2">Registrarse</button>
                   <button type="button" onClick={ (e) => handleRegister(e) } className="btn btn-primary m-2">Login</button>


               </form>
        </div> 
            );


}

