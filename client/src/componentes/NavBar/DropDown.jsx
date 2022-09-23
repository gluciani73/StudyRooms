import React from "react";
import { useState } from "react";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import user from '../../recursos/user.png'
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap'



export default function DropDown(){
    const [dropdown, setDropdown] =useState(false)
    const histori = useNavigate()
    function OpenCloseDropdown(){
        setDropdown(!dropdown)
       
    }

    const LogOut=()=>{
        localStorage.clear('token');
        histori("/")
      }
    
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                        <DropdownToggle >
                        <img src={user} alt="user"height='30px'/>
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem><Link to={'/Profile'}>Profile</Link></DropdownItem>
                            <DropdownItem onClick={LogOut}>LogOut</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
        </>
    )
}