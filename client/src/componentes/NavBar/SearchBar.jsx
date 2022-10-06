import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQuestions, searchQuestion } from "../../Controllers/Actions/questionsActions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setText(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    text.length > 0 ? dispatch(searchQuestion(text)) : dispatch(getQuestions())
  }

  return (
    <form className="d-flex px-5 " onSubmit={(e)=> e.preventDefault()}>
      <input
        className="form-control me-2 px-5"
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="button"
        onClick={(e) => handleSubmit(e)}
        className="btn btn-primary"
      >
        Search
      </button>
    </form>
  );
};
export default SearchBar;
