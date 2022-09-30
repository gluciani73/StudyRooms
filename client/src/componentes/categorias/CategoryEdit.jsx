import React from "react";
import CategoryForm from "./CategoryForm";
import {useDispatch} from "react-redux";
import {updateCategoryItem} from "../../Controllers/Actions/categoryActions";

export default function CategoryEdit({categoryItem, handleAction, handleCancel}) {

    const dispatch = useDispatch();

    function handleEditButton(categoryItem) {
        const categoryUpdated = {...categoryItem}
        dispatch(updateCategoryItem(categoryUpdated));
        handleAction();
    }

    function handleCancelButton() {
        handleCancel()
    }

    return (
        <div>
            <h3>Edit Category</h3>
            <CategoryForm buttonText={'Save'}
                          buttonAction={handleEditButton}
                          buttonCancel={handleCancelButton}
                          categoryInitial={categoryItem}
            />
        </div>
    );
}
