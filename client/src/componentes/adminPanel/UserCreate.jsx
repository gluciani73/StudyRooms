import React from "react";
import UserForm from "./UserForm";
import {useDispatch} from "react-redux";
import {createUserAction} from "../../Controllers/Actions/userAction";
import './UserCreate.css';

export default function UserCreate()  {

    const dispatch = useDispatch();

    function handleCreateButton(userItem) {
        const userUpdated = {...userItem}
        dispatch(createUserAction(userUpdated));
    }

    return (
        <div className='createUserContainer'>
            <h1 className='createUserTitle'>Create an user</h1>
            <UserForm buttonText={'Create'}
                      buttonAction={handleCreateButton}
            />
        </div>
    );
}
