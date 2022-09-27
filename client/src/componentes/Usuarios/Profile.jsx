import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import EditProfile from "./EditarPerfil";
import EditPassword from "./EditPassword";



export default function ProfileUser(){

    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const [showEdit, setShowEdit] = useState(false)
    const [showEditPassword, setShowEditPassword] = useState(false)

    function handleEdit(e){
        setShowEdit(!showEdit)
    }

    function handleEditPassword(e){
        setShowEditPassword(!showEditPassword)
    }
    const mystyle = {
        borderRadius: "1000px",
        backgroundColor: "DodgerBlue",
        padding: "5px",
        width:"100px"
        
      };

    return(
        <div >
        <NavBar/>
            <div>
                <h2>My Profile</h2>
                <figure><img src={userInfo?.avatar} alt="avatar" style={mystyle} /></figure>
                <div>
                    <h3>NickName: {userInfo?.userName}</h3>
                    <h3>Name: {userInfo?.firstName}</h3>
                    <h3>Last Name: {userInfo?.lastName}</h3>
                    <h3>Email: {userInfo?.email}</h3>
                </div>
                {showEditPassword ? undefined : <button type="button" onClick={handleEdit}>{showEdit? "Cancelar" : "Editar Perfil"}</button>}
                {/* <button onClick={handleEditPassword}>Cambiar Contraseña</button> */}
                {showEdit ? undefined : <button onClick={handleEditPassword}>{showEditPassword ? "Cancelar" : "Cambiar contraseña"}</button> }
                {showEdit ?
                 <EditProfile/>
                 
                 
                 : undefined}
                 {showEditPassword? <EditPassword /> : undefined}
            </div>
        
        
        </div>
    )
}
