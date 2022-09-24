import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";


export default function ProfileUser(){

    const userInfo = useSelector((state)=> state.loginReducer.userInfo);

    return(
        <>
        <NavBar/>
            <div>
                <h2>My Profile</h2>
                <div>
       
                    <h3>Name: {userInfo?.firstName}</h3>
                    <h3>Last Name: {userInfo?.lastName}</h3>
                    <h3>Email: {userInfo?.email}</h3>
                </div>
            </div>
        
        
        </>
    )
}
