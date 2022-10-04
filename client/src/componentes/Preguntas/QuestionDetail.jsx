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
        <div className="bg-dark text-white"  key={index}>
          <NavBar/>
          <div className="container border bg-dark text-white">
          <h5 >user {e.userId} asks:</h5>
          <h2 >{e.title}?</h2>
          <h4 >description:</h4>
          <h5 >{e.description}</h5>
          
          
          
          <div className="d-flex align-items-center">
            <span><LikeB userId={e.userId} questionId={e.id}/> </span>
            
            <LogDel/>

        
          
          <ReactStars
          className="p-2 ms-auto"
            value={Number(myQuestion[0].ratingAverage)}
            onChange={(newRate) => handleRateChange(uId, id, newRate)}
            edit={true}
            size={30}
            half={false}
            />  
            <p>Rating: {e.ratingAverage}</p>
            <p>Ratings: {e.ratingCount} </p>
            </div>
            </div>

            <CommentList questionId={id}/>
          <AnswerList questionId={id}/>        
          
        
        </div>
        
  )
    })
    
  ) 
  
  }
export default QuestionDetail;