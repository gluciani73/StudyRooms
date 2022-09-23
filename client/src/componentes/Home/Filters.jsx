import React  from "react";
import { useDispatch } from "react-redux";
import { FilterCategory, FilterCategory2, SortRating } from "../../Controllers/Actions/filterHomeActions";
const Filters = () =>{

    const dispatch = useDispatch();

  
      function handleFilterCategory(e){
        dispatch(FilterCategory(e.target.value)) //falta asignar action
    }
    function handleFilterCategory2(e){
        dispatch(FilterCategory2(e.target.value)) //falta asignar action
    }
    function handleSortRating(e){
        e.preventDefault();
        dispatch(SortRating(e.target.value))
    }

    return(
        <div>
            <h1>Filters</h1>
            <p>Category</p>
            <select className="form-select" onChange={e=>handleFilterCategory(e)}>
                <option value="All">All</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Economy">Economy</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Languages">Languages</option>
            </select>
            <p>Second Category</p>
            <select className="form-select" onChange={e=>handleFilterCategory2(e)}>
                <option value="All">All</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Economy">Economy</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Languages">Languages</option>
            </select>
            <p>Rating</p>
            <select className="form-select" onChange={e=>handleSortRating(e)}>
                <option value="asc">Major to Minor</option>
                <option value="des">Major to Minor</option>
            </select>
        </div>
    )
}

export default Filters