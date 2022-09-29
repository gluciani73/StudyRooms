import { useDispatch } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetail } from "../../Controllers/Actions/questionsActions";
import AnswerList from '../answers/AnswerList'
import CommentList from '../comments/CommentList'
import NavBar from '../NavBar/NavBar'
import LikeB from '../likebutton/Likeb'
import LogDel from '../likebutton/LogDel'
import ReactStars from 'react-stars'
import { rateQuestions } from "../../Controllers/Actions/likesActions";
import sweetalert from 'sweetalert';



const QuestionDetail = () => {
let {id} = useParams();
const dispatch = useDispatch();  
useEffect(()=>{dispatch(getDetail(id))},[dispatch])
const uId = useSelector((state)=> state.loginReducer.userInfo.id);
const myQuestion = useSelector((state)=>state.questionReducer.detail.data);




function handleRateChange(userId, questionId, rating) {
  if(uId !== myQuestion[0].userId) {
      dispatch(rateQuestions({userId, questionId, rating}));
  }
  else {
      sweetalert({
          title:"Action not allowed",
          text: `You can not rate your own answer.`
      });
  }
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
            value={myQuestion[0].ratingAverage}
            onChange={(newRate) => handleRateChange(uId, id, newRate)}
            edit={true}
            size={30}
            half={false}
            />  
          <AnswerList questionId={id}/>        
          <CommentList questionId={id}/>
        </div>
        
  )
    })
    
  ) 
  
  }
export default QuestionDetail;