import { useDispatch } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetail } from "../../Controllers/Actions/questionsActions";
import { useState } from "react";


const QuestionDetail = () => {
  let {id} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(getDetail(id))},[dispatch])
  const myQuestion = useSelector((state)=>state.questionReducer.uestions.data)
  
  
  console.log(myQuestion)
  
  return(
    myQuestion && myQuestion.id?
    (
      <div key={myQuestion.id}>
          <h2>{myQuestion.title}</h2>
          <h3>{myQuestion.userId}</h3>
          <h2>{myQuestion.description}</h2>
          <h2>{myQuestion.createdAt}</h2>
          <Link to='/home'>Go back</Link>
      </div>

      
    ):(
      <div><h2>Loading</h2></div>
    )
    
  ) 
}
 
export default QuestionDetail;