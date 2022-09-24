import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";



export default function ProfileUser(){

    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const [showEdit, setShowEdit] = useState(false)

    function handleEdit(e){
        setShowEdit(!showEdit)
    }
    const mystyle = {
        borderRadius: "1000px",
        backgroundColor: "DodgerBlue",
        padding: "5px",
        
      };

    return(
        <>
        <NavBar/>
            <div>
                <h2>My Profile</h2>
                <figure><img src={userInfo.avatar} alt="" style={mystyle} /></figure>
                <div>
                    <h3>NickName: {userInfo?.userName}</h3>
                    <h3>Name: {userInfo?.firstName}</h3>
                    <h3>Last Name: {userInfo?.lastName}</h3>
                    <h3>Email: {userInfo?.email}</h3>
                </div>
                <button type="button" onClick={handleEdit}>Editar Perfil</button>
                <button>Cambiar Contraseña</button>

                {showEdit ? <h1>Aqui se muestre el formulario para realizar cambios</h1> : undefined}
            </div>
        
        
        </>
    )
}
