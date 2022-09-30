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
      <div className="row m-0 p-0 sticky-top">
        <div className="col p-0 m-0">
          <NavBar />
        </div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-2 p-0 m-0">
          <div className="row m-0 p-0 sticky">
            <Filters />
          </div>
          <div className="row bg-dark m-0 p-0">
            <Link to="/home" className="text-decoration-none m-0 p-0">
            <div className="col d-flex w-100 mt-5 justify-content-center ">
              <p className=" text-light text-center" > Contact Us </p>
            </div>
            </Link>
          </div>
        </div>
        <div className="col p-1 m-0 ">
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
          <footer>
            <div className="row m-0 p-0 bg-dark">
              <div className="col m-0 p-0 d-flex justify-content-center">
                <p></p>
              </div>
            </div>
          </footer>
    </div>
  );
}

export default Home;