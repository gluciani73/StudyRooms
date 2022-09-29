import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";
// import "../../CssAdicional/Home.css"
import Question from "../Preguntas/Question";
import { getQuestions } from "../../Controllers/Actions/questionsActions";
import '../../CssAdicional/QuestionsCss.css'



const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch]);

  const allQuestions = useSelector((state) => state.questionReducer.allQuestions.data)

  return (
    <div>
      <div className="row m-0 p-0">
        <div className="col p-0 m-0">
          <NavBar />
        </div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-2 p-0 m-0">
          <Filters />
        </div>
        <div className="col p-0 m-0 ">
          {allQuestions?.map((e, id) => {
            return (
              <div key={id} className = " colQuestions">
                <Link to={`/QuestionDetail/${e.id}`}>
                  <Question key={e.id} title={e.title} description={e.description} ratingAverage={e.ratingAverage} likes={e.votesxquestions.length} userId={e.user.userName} > </Question>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;