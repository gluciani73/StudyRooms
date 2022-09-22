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
  const myQuestion = useSelector((state)=>state.questionReducer.detail.data)
  
  console.log(myQuestion)
  
  return(
    myQuestion?.map((e)=>{
      return(
        <div>
          <h1>{e.userId}</h1>
          <h1>{e.title}</h1>
          <p>{e.description}</p>
          <Link to='/Home'>home</Link>
        </div>
        
  )
    })
    
  ) 
}
 
export default QuestionDetail;