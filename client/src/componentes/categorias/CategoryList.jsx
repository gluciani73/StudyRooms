import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryList, deleteCategoryItem, sortCategoryList} from "../../Controllers/Actions/categoryActions";
import {SORT_BY_ID_ASC, SORT_BY_ID_DSC, SORT_BY_NAME_ASC, SORT_BY_NAME_DSC} from "../../Controllers/Reducer/categoryReducer";
import CategoryCreate from "./CategoryCreate";
import CategoryEdit from "./CategoryEdit";
import '../answers/AnswerList.css';
import sweetalert from 'sweetalert';
import NavBar from "../NavBar/NavBar";

export default function CategoryList () {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const categoryList = useSelector(state => state.categoryStore.categoryList);
    const [showEditForm, setShowEditForm] = useState(false);
    const [categoryEditId, setCategoryEditId] = useState(null);
    const sortOption = useSelector(state => state.categoryStore.sortOption);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!categoryList) {
            dispatch(getCategoryList());
        }
    }, [dispatch, categoryList]);

    function handleShowEditForm(categoryId) {
        setCategoryEditId(categoryId);
        setShowEditForm(!showEditForm);
    }

    function handleHideEditForm() {
        setCategoryEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeleteCategoryItem(categoryItem) {
        sweetalert({
            title:"Action confirmation",
            text: "Do your really want to delete your category?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then(value => {
            if(value) {
                dispatch(deleteCategoryItem(categoryItem));
            }
        });
    }

    function handleOrderChange(event) {
        dispatch(sortCategoryList(event.target.value));
    }

    function renderCategoryItem(categoryItem) {
        return (
            <div className='singleAnswer' key={categoryItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Category {categoryItem.id}</h3>
                </div>
                <p><b>Name: </b>{categoryItem.category}</p>

                <button className="buttonAction"
                        onClick={() => handleShowEditForm(categoryItem.id)}
                        disabled={showEditForm}
                >
                    Edit
                </button>

                <button className="buttonCancel"
                onClick={() => handleDeleteCategoryItem(categoryItem)}
                disabled={showEditForm}
                >
                    Delete
                </button>

                {showEditForm && categoryEditId === categoryItem.id && (
                    <CategoryEdit categoryItem={categoryItem}
                                  handleAction={handleHideEditForm}
                                  handleCancel={handleHideEditForm}
                    />
                )}
            </div>
        );
    }

    function renderCategoryList() {
        if (!userInfo.isAdmin) {
            return (
                <div className='answerListContainer'>
                    <h3>The category list can only be seen by admin users...</h3>
                </div>
            );
        }
        if (!categoryList || categoryList.length === 0) {
            return (
                <div className='answerListContainer'>
                    <h3>Be the first one to add a category...</h3>
                </div>
            );
        }
        return (
            <>
                <div className='answerListContainer'>
                    <div className="singleAnswerTitle">
                        <h2>Category List</h2>
                        <div className='filterSelect'>
                            <label htmlFor="sort-list"><b>Order by: </b></label>
                            <select id="sort-list"
                                    onChange={(e) => {handleOrderChange(e)}}
                                    value={sortOption}
                            >
                                <option value={SORT_BY_ID_ASC}>Creation ascending</option>
                                <option value={SORT_BY_ID_DSC}>Creation descending</option>
                                <option value={SORT_BY_NAME_ASC}>Name ascending</option>
                                <option value={SORT_BY_NAME_DSC}>Name descending</option>
                            </select>
                        </div>
                    </div>
                    {categoryList.map(item => renderCategoryItem(item))}
                </div>
                <CategoryCreate />
            </>
        );
    }

    return (
        <div>
            <NavBar/>
            {renderCategoryList()}
        </div>
    );
}
