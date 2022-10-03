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
// eslint-disable-next-line react-hooks/exhaustive-deps
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


//className="bg-dark text-white"*
  
  return(
    myQuestion?.map((e,index)=>{
      
      return(
        <div  key={index}>
          <NavBar/>
          <div className="container bg-dark text-white">
          <h5 >user {e.userId} asks:</h5>
          <h2 >{e.title}?</h2>
          <h4 >description:</h4>
          <h5 >{e.description}</h5>
          
          
          
          <div className="d-flex align-items-center">
            <LikeB className="align-items-center" userId={e.userId} questionId={e.id}/> 
            
            <LogDel/>

          <Link className="p-2 ms-auto" to='/Home'>
            <button>home</button>
            </Link>
          
          <ReactStars
          className="p-2"
            value={myQuestion[0].ratingAverage}
            onChange={(newRate) => handleRateChange(uId, id, newRate)}
            edit={true}
            size={30}
            half={false}
            />  
          
            </div>
            </div>
          <AnswerList questionId={id}/>        
          <CommentList questionId={id}/>
        
        </div>
        
  )
    })
    
  ) 
  
  }
export default QuestionDetail;