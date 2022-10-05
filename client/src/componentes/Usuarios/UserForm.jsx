
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
   



    const [newUser, setNewUser] = useState({
    userName:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    ConfirmPassword:"",
    avatar:""
   });


   const [checked, setChecked] = useState(false);

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


        if(!checked) {
            alert("Por favor indica que aceptas los Términos y Condiciones");
            return false
        }
        if(newUser.userName.length < 3 ) {
            alert("El nombre de usuario debe contener al menos 3 caracteres y como maximo 10")
        }else if (newUser.password.length < 8 || newUser.password.length > 16 ){
            alert("La contraseña debe contener al menos 8 caracteres y como maximo debe tener 16 caracteres")
        
        }else if(newUser.avatar === undefined){
            alert("Avatar not found")
        }else{
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
            if (errorLog === "ya existe una cuenta con ese username"){
                alert("Error")
                
            }else{
                alert("Usuario creado correctamente")
            }
           
        }
        

           
           

        }
 console.log(errorLog)
        return (

            <div className='d-flex flex-column align-items-center h-auto bg-light'>
                
                <form onSubmit={(e)=> handleSubmit(e)} className="d-flex flex-column  align-items-center text-center">
                <h1>Register</h1>
                {errorLog && <p className="alert alert-danger">{errorLog}</p>}
                    <div>
                   
                        <label htmlFor="NickName">Nickname</label>
                        <input pattern="^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$"
                            title='El nombre de usuario debe contener entre 3 y 16 caracteres. No puede contener simbolos' 
                            className='d-block  m-1 border-1 form-control'  
                            type="text" value={newUser.userName} 
                            id='userName' 
                            name='userName' 
                            placeholder='Nickname' 
                            autoComplete='off'  
                            onChange={(e)=>handleChange(e)} 
                            required/>                  
                        
                   </div>

                    <div>
                     
                        <label htmlFor="firstName">Name</label>
                        <input pattern='[a-zA-Z]\S{1,15}' 
                        title='Solo puede contener letras sin espacios'  
                        className='d-block  m-1 border-1 form-control' 
                        type="text" value={newUser.firstName} 
                        id='firstName' name='firstName'
                         placeholder='User Name' 
                         autoComplete='off'  
                         onChange={(e)=>handleChange(e)} 
                         required/>
                    </div>



                    <div>
                   
                        <label htmlFor="lastName">Last Name</label>                
                        <input pattern="[a-zA-Z]\S{1,15}" 
                        title='No puede contener espacios ni caracteres especiales'  
                        className='d-block  m-1 border-1 form-control' 
                        type="text" value={newUser.lastName} 
                        placeholder='Last Name' 
                        id='lastName'
                        name='lastName'
                        onChange={(e)=>handleChange(e)} 
                        required/>
                    </div>

                    <div>
                       
                        <label htmlFor="email">Email</label>                            
                        <input pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" 
                        title="Ingrese un mail valido" 
                        className='d-block  m-1 border-1 form-control' 
                        type="email" value={newUser.email} 
                        placeholder='email@example.com'
                        name='email' 
                        id='email' 
                        autoComplete='off' 
                        onChange={(e)=>handleChange(e)} 
                        required/>
                    </div>


                    <div>
                       
                        <label htmlFor="password">Password</label>                     
                        <input pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{7,16}$" 
                        title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico." 
                        className='d-block  m-1 border-1 form-control' 
                        type="password"  
                        value={newUser.password} 
                        name='password' 
                        id='password' 
                        placeholder='Password'  
                        onChange={(e)=>handleChange(e)} 
                        required/>                    
                    </div>

                    <div>
                       
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input className='d-block  m-1 border-1 form-control' 
                        type="password"  
                        value={newUser.ConfirmPassword} 
                        name='ConfirmPassword' 
                        id='ConfirmPasswordoto' 
                        placeholder='ConfirmPassword' 
                        onChange={(e)=>handleChange(e)}
                         required/>
                    
                    </div>




                    <div>

                        <label htmlFor="Photo">Photo</label>
                        <input type="file"  
                        accept="image/png, image/jpeg"  
                         name='avatar' 
                         id='avatar'  
                         onChange={(e)=>uploadImage(e)} 
                         required />
                        {newUser.avatar.length ? 
                        (<img src={newUser.avatar} width="50" height="50" alt="uploaded img" />)
                            : null
                          
                        }      
                    </div>  

                   

                    <div >
                        <label htmlFor="acceptT" >Acepto los
                        <button onClick={()=>showAlert()} 
                        style={{ border:'none', backgroundColor:"white", color:"blue" }}
                        >términos y condiciones
                        </button> del servicio</label>
                        <input type="checkbox"  
                        name="acceptT" 
                        id="acceptT" 
                        checked={checked} 
                        onChange={handleChangeCheckbox}/>
                    </div>

                   <button type='submit' 
                   value='Register'  
                   className="btn btn-primary m-2">Registrarse</button>
                   <button type="button" 
                   onClick={ (e) => handleRegister(e) } 
                   className="btn btn-primary m-2">Login</button>


               </form>
        </div> 

            );


}

