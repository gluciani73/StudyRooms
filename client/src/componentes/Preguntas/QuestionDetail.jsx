import { useDispatch } from "react-redux";
import {Link, useParams} from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const QuestionDetail = () => {
  let {id} = useParams();
  const dispatch = useDispatch();
  useEffect (()=>dispatch(getDetail(id),[dispatch]))
  const myQuestion = useSelector ((state)=>state.detail)
  return ( 
    myQuestion && myQuestion.id ? (
      <div key ={myQuestion.id}>
        <div>
          <h1>{myQuestion.title}</h1>
          <h3>{myQuestion.userId}</h3>
          <h3>{myQuestion.votes}</h3>
          <h2>{myQuestion.description}</h2>
          <Link to="/Home">Go back</Link>
        </div>

        <div>
          {myQuestion.answers.map(e=>{
            return(
              <div>
                <AnswerList key={e.id} title/>
              </div>
            )
          })}
        </div>

      </div>
    ) : <div><p>Loading</p></div>
    
      );
}
 
export default QuestionDetail;