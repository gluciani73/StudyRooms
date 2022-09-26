
import {postLikesQuestions, deleteLikesQuestions} from "../../Controllers/Actions/likesActions"
import { useDispatch, useSelector } from 'react-redux';
import like from '../../recursos/thumbs.png'
import { getDetail } from "../../Controllers/Actions/questionsActions";



const LikeB = (userId,questionId) => {
    const dispatch = useDispatch();
    const check = useSelector((state)=>state.questionReducer.detail.data)

    function handleClick(e){
        e.preventDefault();
        dispatch(postLikesQuestions(userId, questionId))
        console.log(userId, questionId)
    }

    function handleClick2(e){
        e.preventDefault();
        dispatch(deleteLikesQuestions(userId, questionId))
        console.log(userId, questionId)
    }


    if((check.map((e)=>{e.votesxquestions})).length>1){
        return (<div>

            <button onClick={e =>{handleClick2(e)}}>
                <div>
                <img src={like} alt="" height="20px"/>
                </div>
            </button>
        </div>  );
    }else{
    
    return (<div>

        <button onClick={e =>{handleClick(e)}}>
            <div>
            <img src={like} alt="" height="20px"/>
            </div>
        </button>
    </div>  );
}}
 
export default LikeB;