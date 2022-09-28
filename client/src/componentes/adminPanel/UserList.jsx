import React from "react";
import NavBar from "../NavBar/NavBar";
import {useSelector} from "react-redux";

export default function UserList () {

    const userInfo = useSelector(state => state.loginReducer.userInfo);

    function renderUserList() {
        if (!userInfo.isAdmin) {
            return (
                <div className='answerListContainer'>
                    <h3>The user list can only be seen by admin users...</h3>
                </div>
            );
        }
        return (
            <div>
                <h2>Admin User List</h2>
            </div>
        );
    }

    return (
        <>
            <NavBar/>
            {renderUserList()}
        </>
    );
}