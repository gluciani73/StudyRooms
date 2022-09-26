import React from "react";
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap'



export default function DropDown(){
    
    const user = useSelector((state)=> state.loginReducer.userInfo);
    console.warn(user)

    const LogOut=()=>{
        localStorage.clear('token');
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
                            <Dropdown.Item href='/Profile'>Profile</Dropdown.Item>
                            <Dropdown.Item href='/' onClick={LogOut}>Logout</Dropdown.Item>
       
                        </Dropdown.Menu>
                        </Dropdown>
                    
        </>
    )
}