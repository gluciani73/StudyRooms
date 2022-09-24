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
      const mystyle = {
        borderRadius: "1000px",
 
        padding: "5px",
        width: "40px"
      };
      const mystyledropdown = {
        alignItem: "center",    
        borderRadius: "20000px",
        backgroundColor: "DodgerBlue",
        height:"9vh",
        width:"10vh"
       
      };
    
    return (
        <>
           
                    
                        <Dropdown variant="success" id="dropdown-basic"  >
                        <Dropdown.Toggle style={mystyledropdown} >
                        <figure><img src={user.avatar} alt="" style={mystyle} /></figure>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item ><Link to={'/Profile'}>Profile</Link></Dropdown.Item>
                            <Dropdown.Item href="/" onClick={LogOut}>Logout</Dropdown.Item>
       
                        </Dropdown.Menu>
                        </Dropdown>
                    
        </>
    )
}