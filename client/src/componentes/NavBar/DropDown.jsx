import React from "react";
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap'
import '../../CssAdicional/QuestionsCss.css'

export default function DropDown() {

  const user = useSelector((state) => state.loginReducer.userInfo);

  const LogOut = () => {
    localStorage.clear('token');
  }

  return (
    <div className="">
      <Dropdown variant="success" id="dropdown-basic"  >
        <Dropdown.Toggle className="bg-transparent border-0 logoMain" >
          <img src={user.avatar} width="50px" className="rounded-circle" alt="ImagenPerfil" />
          <p>{user.userName}</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='/Profile'>Profile</Dropdown.Item>
          <Dropdown.Item href='/' onClick={LogOut}>Logout</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}