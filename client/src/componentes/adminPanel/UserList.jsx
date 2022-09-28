import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import NavBar from "../NavBar/NavBar";
import {useSelector} from "react-redux";
import {getUserList} from "../../Controllers/Actions/userAction";
import userReducer from "../../Controllers/Reducer/userReducer";

export default function UserList () {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userList = useSelector(state => state.userReducer.userList);

    const dispatch = useDispatch();
    useEffect(() => {
        if(!userList || userList.length === 0) {
            dispatch(getUserList());
        }
    }, [dispatch, userList]);

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