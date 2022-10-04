import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchQuestion } from "../../Controllers/Actions/questionsActions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setText(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchQuestion(text));
  }

  return (
    <form className="d-flex px-5 ">
      <input
        className="form-control me-2 px-5"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="btn btn-primary"
      >
        Search
      </button>
    </form>
  );
};
export default SearchBar;
