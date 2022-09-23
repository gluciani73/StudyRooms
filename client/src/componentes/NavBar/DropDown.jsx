import React from "react";
import { useState } from "react";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import user from '../../recursos/user.png'
import { Link } from "react-router-dom";
import 'bootstrap'



export default function DropDown(){
    const [dropdown, setDropdown] =useState(false)

    function OpenCloseDropdown(){
        setDropdown(!dropdown)
    }
    
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
                        <DropdownToggle >
                        <img src={user} alt="user"height='30px'/>
                        </DropdownToggle>

                        <DropdownMenu>
                            <DropdownItem><Link to={'/Profile'}>Profile</Link></DropdownItem>
                            <DropdownItem>LogOut</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
        </>
    )
}