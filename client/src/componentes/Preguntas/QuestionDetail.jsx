import { useDispatch } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDetail } from "../../Controllers/Actions/questionsActions";
import AnswerList from '../answers/AnswerList'
import CommentList from '../comments/CommentList'
import NavBar from '../NavBar/NavBar'
import LikeB from '../likebutton/Likeb'
import LogDel from '../likebutton/LogDel'
import ReactStars from 'react-stars'
import { rateQuestions } from "../../Controllers/Actions/likesActions";

const QuestionDetail = () => {
  let {id} = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{dispatch(getDetail(id))},[dispatch])
  const userInfo = useSelector((state)=> state.loginReducer.userInfo);
  const myQuestion = useSelector((state)=>state.questionReducer.detail.data)

const [input,setInput]= useState({
  userId: userInfo.id,
  questionId: myQuestion[0].id,
  rating:0
})



function handleSubmit(e){
  e.preventDefault();
  dispatch(rateQuestions(id,input))
  setInput({
    userId: userInfo.id,
    questionId: myQuestion[0].id,
    rating:newRating
  })

 
}

  
  return(
    myQuestion?.map((e,index)=>{
      
      return(
        <div key={index}>
          <NavBar/>
          <h1>user:{e.userId}</h1>
          <h1>title:{e.title}</h1>
          <p>description:{e.description}</p>
          <div >
            <LikeB userId={e.userId} questionId={e.id}/> 
            <p>{e.votesxquestions.length}</p>
          </div>

          <Link to='/Home'>home</Link>
          <LogDel/>
          <ReactStars
            className="stars"
            onChange={newRating} 
            value={Number(e.ratingAverage)}
            edit={true}
            size={20}/>
            

          <AnswerList questionId={id}/>        
          <CommentList questionId={id}/>
        </div>
        
  )
    })
    
  ) 
}
 
export default QuestionDetail;