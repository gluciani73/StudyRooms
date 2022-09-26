import { useDispatch } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetail } from "../../Controllers/Actions/questionsActions";
import AnswerList from '../answers/AnswerList'
import CommentList from '../comments/CommentList'
import NavBar from '../NavBar/NavBar'
import LikeB from '../likebutton/Likeb'

const QuestionDetail = () => {
  let {id} = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{dispatch(getDetail(id))},[dispatch])
  const myQuestion = useSelector((state)=>state.questionReducer.detail.data)
  
  
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
          <AnswerList questionId={id}/>        
          <CommentList questionId={id}/>
        </div>
        
  )
    })
    
  ) 
}
 
export default QuestionDetail;