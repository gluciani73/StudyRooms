import React, { useState } from 'react'
import { editUserAction } from '../../Controllers/Actions/userAction'
import {useDispatch} from "react-redux"
import { useSelector } from "react-redux";


const EditarPerfil = ()=>{
    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const userId = userInfo.id
    const dispatch =useDispatch();
    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]{3,15}$/.test(data.firstName)) || data.firstName.length < 3 ) errors.firstName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        if(!(/^[a-zA-Z]{3,15}$/.test(data.lastName)) || data.lastName.length < 3 ) errors.lastName = "Ingrese un nombre que contenga entre 3 y 15 caracteres"
        return errors;
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
        e.preventDefault();
            dispatch(editUserAction(newUser, userId))
            setNewUser({
                firstName:"",
                lastName:"",
                avatar:""
            })
            alert("Usuario modificado correctamente")

        }
console.log(newUser)
    return (
        <div className='col p-0 m-0 d-flex justify-content-center align-items-center'>
            <form onSubmit={(e)=> handleSubmit(e)} className="justify-content-center align-items-center text-center">
                <h1>Editar datos</h1>


                    <div>

                        <label htmlFor="firstName">First Name</label>
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.firstName} id='firstName' name='firstName' placeholder='User Name' autoComplete='off'   onChange={(e)=>handleChange(e)}/>
                        {formError.firstName && <span><strong>{formError.firstName}</strong></span>}
                    </div>



                    <div>
                        <label htmlFor="lastName"> Last Name</label>                
                        <input className='d-block  m-1 border-0 form-control' value={newUser.lastName} type="text"  placeholder='Last Name' id='lastName' name='lastName' onChange={(e)=>handleChange(e)}/>
                        {formError.lastName && <span><strong>{formError.lastName}</strong></span>}

                    </div>

                    
                    <div>
                        <label htmlFor="foto">Avatar</label>
                        <input className='d-block  m-1 border-0 form-control' type="text" value={newUser.avatar}   name='avatar' id='foto' placeholder='foto'  onChange={(e)=>handleChange(e)}/>
                    </div>

                    <button type='submit' value='update'>Confirm</button>    <button type='submit' value='update'>Cancel</button>

               </form>
        </div>
    )
}
export default EditarPerfil