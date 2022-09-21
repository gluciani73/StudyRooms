import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";
// import "../../CssAdicional/Home.css"
import Question from "../Preguntas/Question";
import { getQuestions } from "../../Controllers/Actions/questionsActions";




const Home = () => {

  const dispatch = useDispatch();
  const allQuestions = useSelector ((state)=>state.questionReducer.questions )
  useEffect(()=>{  
    dispatch(getQuestions())},[dispatch]);
<<<<<<< HEAD



  const allQuestions = useSelector ((state)=>state.questionReducer.allQuestions.data )
=======
>>>>>>> 9663641367fb86b07ea90a7f097f4efaa38d7a05
  
  
  return (<div>
   
<div className="container">
<NavBar/>
    <div className="row">
        <div className="col-4 col-lg-2">
        <Filters/>
    </div>
    <div className="col">
      <div className="container">
        {allQuestions?.map((e,index)=>{
          return(
              <div>
                <Link to={`/QuestionDetail/${e.id}`}>
                <Question key={e.index} title={e.title} description={e.description} ratingAverage={e.ratingAverage}> </Question>
                </Link>
              </div>
          )
        })}
      </div>
    </div>
    </div>
    </div>
  </div>  );
}
 
export default Home;