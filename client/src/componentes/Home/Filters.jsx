import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterCategory,
  FilterCategory2,
  SortRating,
} from "../../Controllers/Actions/filterHomeActions";
import { getCategories } from "../../Controllers/Actions/questionsActions";
import { useState } from "react";

const Filters = () => {
  const dispatch = useDispatch();

  const allCategories = useSelector(
    (state) => state.questionReducer.categories.data
  );
  useEffect(()=>{
    dispatch(getCategories())
},[dispatch])

  const data = allCategories?.map((e) => e.category);
  const sortCategories = data?.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  });

  const [check, setCheck] = useState({check:false});


  function handleFilterCategory(e) {
    dispatch(FilterCategory(e.target.value)); //falta asignar action
    setCheck({check:true})
if (e.target.value==="All"){setCheck({check:false})}
  }
  function handleFilterCategory2(e) {
    dispatch(FilterCategory2(e.target.value)); //falta asignar action
  }
  function handleSortRating(e) {
    dispatch(SortRating(e.target.value));
  }

  return (
    <div className="bg-dark text-white">
      <h1>Filters</h1>
      <p>Category</p>
      <select className="form-select 1"  onChange={(e) => handleFilterCategory(e)}>
        <option value="All">All</option>
        {sortCategories?.map((e) => {
          return (
            <option key={e} value={e}>
              {e}
            </option>
          );
        })}
        
      </select>
        
        {check.check === true? 
          <div>
          <p>Second Category</p>
          <select className="form-select 2" onChange={(e) => handleFilterCategory2(e)}>
            <option value="All">All</option>
            {sortCategories?.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          </div>
         : false       
    }

      <p>Likes:</p>

      <select className="form-select" onChange={(e) => handleSortRating(e)}>
        <option value="asc">Minor to Major</option>
        <option value="des">Major to Minor</option>
      </select>
    </div>
  );
};

export default Filters;
