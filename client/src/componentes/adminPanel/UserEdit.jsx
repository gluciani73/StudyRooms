import React from "react";
import UserForm from "./UserForm";
import {useDispatch} from "react-redux";
import {editUserAction} from "../../Controllers/Actions/userAction";

export default function UserEdit({userItem, handleAction, handleCancel}) {

    const dispatch = useDispatch();

    function handleEditButton(userItem) {
        const userUpdated = {...userItem}
        dispatch(editUserAction(userUpdated, userItem.id, true));
        handleAction();
    }

    function handleCancelButton() {
        handleCancel()
    }

    return (
        <div>
            <h3>Edit User</h3>
            <UserForm buttonText={'Save'}
                      buttonAction={handleEditButton}
                      buttonCancel={handleCancelButton}
                      userInitial={userItem}
            />
        </div>
    );
}
