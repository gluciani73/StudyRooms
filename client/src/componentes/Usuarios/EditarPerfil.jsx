import React, { useState } from 'react'
import { editUserAction } from '../../Controllers/Actions/userAction'
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";
import axios from "axios"


const EditarPerfil = ()=>{
    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const userId = userInfo.id
    const dispatch =useDispatch();
    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]{3,15}[^'\s]$/.test(data.firstName)) || data.firstName.length < 3 ) errors.firstName = "Ingrese un nombre que contenga entre 3 y 15 caracteres sin numeros ni espacios"
        if((/^[a-zA-Z]{3,15}[^'\s]$/.test(data.firstName)) || data.firstName.length >= 3 ) errors.firstName = ""
        return errors;
    }

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

    const [formError, setFormError] = useState({})
    const [newUser, setNewUser] = useState({
        firstName:"",
        lastName:"",
        avatar:""
    
    });

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

    function handleSubmit(e){
        if(userInfo.firstName !== newUser.firstName && userInfo.lastName !== newUser.lastName ){
            dispatch(editUserAction(newUser, userId))
            setNewUser({
                firstName:"",
                lastName:"",
                avatar:""
            })
            alert("Usuario modificado correctamente")
        }else{
            alert("Error")
        }
}

    return (
        <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
            <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Editar datos</h1>


                    <div>

                        <label htmlFor="firstName">First Name</label>
                        {formError.firstName && <p className="alert alert-danger">{formError.firstName}</p>}
                        <input pattern="[a-zA-Z]{3,15}[^'\s]" title='No puede contener numeros ni espacios' className='d-block  m-1 border-0 form-control' type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder={userInfo.firstName} autoComplete='off'   onChange={(e)=>handleChange(e)}/>
                        
                    </div>



                    <div>
                        <label htmlFor="lastNaame"> Last Name</label>  
                        <input pattern="[a-zA-Z]{3,15}[^'\s]" title='No puede contener numeros ni espacios' className='d-block  m-1 border-0 form-control' value={newUser.lastName} type="text" autoComplete='off'  placeholder={userInfo.lastName} id='lastName' name='lastName' onChange={(e)=>handleChange(e)}/>      
                    </div>

                    
                    <div>
                        <label htmlFor="foto">Avatar</label>
                        <input  className='d-block  m-1 border-0 form-control' type="file" accept='image/png, image/jpeg'  name='avatar' id='foto' placeholder='foto'  onChange={(e)=>uploadImage(e)}/>
                    </div>

                    <button type='submit' className=' btn-success' value='update'>Save</button> 
               </form>

               
        </div>
    )
}
export default EditarPerfil