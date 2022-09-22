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

  useEffect(()=>{  
    dispatch(getQuestions())},[dispatch]);




  const allQuestions = useSelector ((state)=>state.questionReducer.allQuestions.data )


  
  return (<div>
   
<div className="container">
<NavBar/>
    <div className="row">
        <div className="col-4 col-lg-2">
        <Filters/>
    </div>
    <div className="col">
      <div className="container">
        {allQuestions?.map((e,id)=>{
          return(
              <div>
                <Link to={`/QuestionDetail/${e.id}`}>
                <Question key={e.id} title={e.title} description={e.description} ratingAverage={e.ratingAverage}> </Question>
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