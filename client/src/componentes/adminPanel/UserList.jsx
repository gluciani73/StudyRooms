import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import NavBar from "../NavBar/NavBar";
import {useSelector} from "react-redux";
import './UserList.css';
import UserEdit from "./UserEdit";
import UserCreate from "./UserCreate"
import sweetalert from "sweetalert";
import {
    getUserList,
    editUserAction,
    sortUserListByType,
    sortUserListByField,
    filterUserListByAdmin,
    filterUserListByPremium,
    filterUserListByActive,
} from "../../Controllers/Actions/userAction";
import {ASC, DSC} from "../../constants";
import {
    SORT_BY_EMAIL,
    SORT_BY_FIRST_NAME,
    SORT_BY_ID, SORT_BY_LAST_NAME,
    SORT_BY_USER_NAME,
    FILTER_BY_ADMIN,
    FILTER_BY_PREMIUM,
    FILTER_BY_ACTIVE,
} from "../../Controllers/Reducer/userReducer";

export default function UserList() {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userList = useSelector(state => state.userReducer.userList);

    const [showEditForm, setShowEditForm] = useState(false);
    const [userEditId, setUserEditId] = useState(null);

    const sortOptionType = useSelector(state => state.userReducer.sortOptionType);
    const sortOptionField = useSelector(state => state.userReducer.sortOptionField);

    const filterByAdmin = useSelector(state => state.userReducer.filterByAdmin);
    const filterByPremium = useSelector(state => state.userReducer.filterByPremium);
    const filterByActive = useSelector(state => state.userReducer.filterByActive);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!userList || userList.length === 0) {
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
            title: "Action confirmation",
            text: "Do your really want to de-activate the user?",
            icon: "warning",
            buttons: ["Cancel", "DeActivate"],
            dangerMode: true,
        }).then(value => {
            if (value) {
                dispatch(editUserAction({...userItem, active: false}, userItem.id));
            }
        });
    }

    function handleActivateUserItem(userItem) {
        sweetalert({
            title: "Action confirmation",
            text: "Do your really want to activate the user?",
            icon: "warning",
            buttons: ["Cancel", "Activate"],
        }).then(value => {
            if (value) {
                dispatch(editUserAction({...userItem, active: true}, userItem.id));
            }
        });
    }

    function handleOrderTypeChange(event) {
        dispatch(sortUserListByType(event.target.value));
    }

    function handleOrderFieldChange(event) {
        dispatch(sortUserListByField(event.target.value));
    }

    function handleFilterAdminChange(event) {
        dispatch(filterUserListByAdmin(event.target.value));
    }

    function handleFilterPremiumChange(event) {
        dispatch(filterUserListByPremium(event.target.value));
    }

    function handleFilterActiveChange(event) {
        dispatch(filterUserListByActive(event.target.value));
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

    function renderFilterList() {
        return (
            <div className='filterSelect'>
                <label htmlFor="sort-list"><b>Filter by: </b></label>

                <label>
                    <input id={FILTER_BY_ADMIN}
                           className='radioInput'
                           name="filterField"
                           type="checkbox"
                           value={FILTER_BY_ADMIN}
                           checked={filterByAdmin}
                           onChange={() => handleFilterAdminChange()}
                    />
                    isAdmin
                </label>

                <label>
                    <input id={FILTER_BY_PREMIUM}
                           className='radioInput'
                           name="filterField"
                           type="checkbox"
                           value={FILTER_BY_PREMIUM}
                           checked={filterByPremium}
                           onChange={() => handleFilterPremiumChange()}
                    />
                    isPremium
                </label>

                <label>
                    <input id={FILTER_BY_ACTIVE}
                           className='radioInput'
                           name="filterField"
                           type="checkbox"
                           value={FILTER_BY_ACTIVE}
                           checked={filterByActive}
                           onChange={() => handleFilterActiveChange()}
                    />
                    isActive
                </label>

            </div>
        )
    }

    function renderSortItem() {
        return (
            <>
                <div className='filterSelect'>
                    <label htmlFor="sort-list"><b>Order by: </b></label>

                    <label>
                        <input id={SORT_BY_ID}
                               className='radioInput'
                               name="orderField"
                               type="radio"
                               value={SORT_BY_ID}
                               checked={sortOptionField === SORT_BY_ID}
                               onChange={(e) => handleOrderFieldChange(e)}
                        />
                        Creation
                    </label>

                    <label>
                        <input id={SORT_BY_USER_NAME}
                               className='radioInput'
                               name="orderField"
                               type="radio"
                               value={SORT_BY_USER_NAME}
                               checked={sortOptionField === SORT_BY_USER_NAME}
                               onChange={(e) => handleOrderFieldChange(e)}
                        />
                        UserName
                    </label>

                    <label>
                        <input id={SORT_BY_FIRST_NAME}
                               className='radioInput'
                               name="orderField"
                               type="radio"
                               value={SORT_BY_FIRST_NAME}
                               checked={sortOptionField === SORT_BY_FIRST_NAME}
                               onChange={(e) => handleOrderFieldChange(e)}
                        />
                        Firstname
                    </label>

                    <label>
                        <input id={SORT_BY_LAST_NAME}
                               className='radioInput'
                               name="orderField"
                               type="radio"
                               value={SORT_BY_LAST_NAME}
                               checked={sortOptionField === SORT_BY_LAST_NAME}
                               onChange={(e) => handleOrderFieldChange(e)}
                        />
                        Lastname
                    </label>

                    <label>
                        <input id={SORT_BY_EMAIL}
                               className='radioInput'
                               name="orderField"
                               type="radio"
                               value={SORT_BY_EMAIL}
                               checked={sortOptionField === SORT_BY_EMAIL}
                               onChange={(e) => handleOrderFieldChange(e)}
                        />
                        Email
                    </label>

                    <select id="sort-list"
                            onChange={(e) => {handleOrderTypeChange(e)}}
                            value={sortOptionType}
                    >
                        <option value={ASC}>Ascending</option>
                        <option value={DSC}>Descending</option>
                    </select>
                </div>
            </>
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
                <div className="singleAnswerTitle">
                    <h2>Admin User List</h2>
                    <div>
                        {renderSortItem()}
                        {renderFilterList()}
                    </div>
                </div>
                {userList.map(item => renderUserItem(item))}
                <UserCreate/>
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