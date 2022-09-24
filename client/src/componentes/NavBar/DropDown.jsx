import React from "react";
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';

import { Link, useNavigate } from "react-router-dom";
import 'bootstrap'



export default function DropDown(){
    const histori = useNavigate()
    
    const user = useSelector((state)=> state.loginReducer.userInfo);
    console.warn(user)

    const LogOut=()=>{
        localStorage.clear('token');
        histori("/")
      }
    
    return (
        <>
           
                    
                        <Dropdown variant="success" id="dropdown-basic"  >
                        <Dropdown.Toggle size="sm" >
                            <img src={user.avatar} alt=""  style={{width:"50px", border:"none"}} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item ><Link to={'/Profile'}>Profile</Link></Dropdown.Item>
                            <Dropdown.Item href="/" onClick={LogOut}>Logout</Dropdown.Item>
       
                        </Dropdown.Menu>
                        </Dropdown>
                    
        </>
    )
}