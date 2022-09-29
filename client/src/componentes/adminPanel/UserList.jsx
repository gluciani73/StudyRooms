import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import NavBar from "../NavBar/NavBar";
import {useSelector} from "react-redux";
import {getUserList} from "../../Controllers/Actions/userAction";
import './UserList.css';
import UserEdit from "./UserEdit";
import UserCreate from "./UserCreate"
import sweetalert from "sweetalert";
import {editUserAction} from "../../Controllers/Actions/userAction";

export default function UserList () {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userList = useSelector(state => state.userReducer.userList);

    const [showEditForm, setShowEditForm] = useState(false);
    const [userEditId, setUserEditId] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        if(!userList || userList.length === 0) {
            dispatch(getUserList());
        }
    }, [dispatch, userList]);

    function handleShowEditForm(userId) {
        setUserEditId(userId);
        setShowEditForm(!showEditForm);
    }

    function handleHideEditForm() {
        setUserEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeActivateUserItem(userItem) {
        sweetalert({
            title:"Action confirmation",
            text: "Do your really want to de-activate the user?",
            icon: "warning",
            buttons: ["Cancel", "DeActivate"],
            dangerMode: true,
        }).then(value => {
            if(value) {
                dispatch(editUserAction({...userItem, active: false}, userItem.id));
            }
        });
    }

    function handleActivateUserItem(userItem) {
        sweetalert({
            title:"Action confirmation",
            text: "Do your really want to activate the user?",
            icon: "warning",
            buttons: ["Cancel", "Activate"],
        }).then(value => {
            if(value) {
                dispatch(editUserAction({...userItem, active: true}, userItem.id));
            }
        });
    }

    function renderUserItem(userItem) {
        return (
            <div className='singleAnswer' key={userItem.id}>
                <div className="singleUserTitle">
                    <h3>{userItem.userName}</h3>
                    <img className='avatar' src={userItem.avatar} alt={userItem.userName}/>
                </div>
                <div className='userPropertiesColumns'>
                    <div>
                        <p><b>First Name: </b> {userItem.firstName}</p>
                        <p><b>Last Name: </b> {userItem.lastName}</p>
                        <p><b>Email: </b> {userItem.email}</p>
                    </div>
                    <div>
                        <p><b>Is Admin: </b> {userItem.isAdmin ? "yes" : "no"}</p>
                        <p><b>Is Premium: </b> {userItem.isPremium ? "yes" : "no"}</p>
                        <p><b>Is Active: </b> {userItem.active ? "yes" : "no"}</p>
                    </div>
                </div>

                <button className="buttonAction"
                        onClick={() => handleShowEditForm(userItem.id)}
                        disabled={showEditForm}
                >
                    Edit
                </button>

                {userItem.active && (
                    <button className="buttonCancel"
                            onClick={() => handleDeActivateUserItem(userItem)}
                            disabled={showEditForm}
                    >
                        DeActivate
                    </button>
                )}

                {!userItem.active && (
                <button className="buttonAction"
                        onClick={() => handleActivateUserItem(userItem)}
                        disabled={showEditForm}
                >
                    Activate
                </button>
                )}

                {showEditForm && userEditId === userItem.id && (
                    <>
                        <hr/>
                        <UserEdit userItem={userItem}
                                  handleAction={handleHideEditForm}
                                  handleCancel={handleHideEditForm}
                        />
                    </>
                )}
            </div>
        );
    }

    function renderUserList() {
        if (!userInfo.isAdmin) {
            return (
                <div className='answerListContainer'>
                    <h3>The user list can only be seen by admin users...</h3>
                </div>
            );
        }
        return (
            <div className="answerListContainer">
                <h2>Admin User List</h2>
                {userList.map(item => renderUserItem(item))}
            </div>
        );
    }

    return (
        <>
            <NavBar/>
            {renderUserList()}
            <UserCreate />
        </>
    );
}