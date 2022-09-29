import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchQuestion } from "../../Controllers/Actions/questionsActions";
const SearchBar = () =>{
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setText(e.target.value)
        console.log(text)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchQuestion(text))
    }
    return(
        <form className="d-flex px-5 ">
                     <input className="form-control me-2 px-5" type="search" placeholder="Search" aria-label="Search" onChange={(e)=> handleInputChange(e)}/>
                     <button className="btn btn-primary" type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
                  </form>
    )
}
export default SearchBar