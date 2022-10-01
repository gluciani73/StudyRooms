import React from "react";
import CategoryForm from "./CategoryForm";
import {useDispatch} from "react-redux";
import {createCategoryItem} from "../../Controllers/Actions/categoryActions"
import '../answers/AnswerCreate.css';

export default function CategoryCreate()  {

    const dispatch = useDispatch();

    function handleCreateButton(categoryItem) {
        const categoryUpdated = {...categoryItem}
        dispatch(createCategoryItem(categoryUpdated));
    }

    return (
        <div className='createAnswerContainer'>
            <h1 className='createAnswerTitle'>Create your category</h1>
            <CategoryForm buttonText={'Create'}
                        buttonAction={handleCreateButton}
            />
        </div>
    );
}
