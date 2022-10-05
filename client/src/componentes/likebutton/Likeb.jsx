import {postLikesQuestions, deleteLikesQuestions} from "../../Controllers/Actions/likesActions"
import { useDispatch, useSelector } from 'react-redux';
import like from '../../recursos/thumbs.png'
import { getDetail } from "../../Controllers/Actions/questionsActions";
import { useParams } from "react-router-dom";
import { useState } from "react";



const LikeB = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const check2 = useSelector((state)=>state.loginReducer.userInfo.id);
    const [ableToLike,setAbleToLike] = useState(true)

    const input = {
        questionId:id,
        userId:check2
    }


    const check = useSelector((state)=>state.questionReducer.detail.data)


    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDetail(id))

        if(!ableToLike) return
        
        const test =check[0].votesxquestions.filter((e)=>e.userId === check2)
        
        if(!test.length){
            dispatch(postLikesQuestions(input))
        }else{
            dispatch(deleteLikesQuestions(input))
        }

        setAbleToLike(false)
            setTimeout(()=>{
                setAbleToLike(true)
            },500)

        dispatch(getDetail(id))
    }
        
        return (<div className="btn bg-dark ">

            <button className="bg-dark border-0" onClick={e =>handleSubmit(e) }>
                <div className="bg-primary btn d-inline-flex align-items-center">
                <img src={like} alt="" height="20px"/>
                <span>likes:</span>
                <span>{check[0].votesxquestions.length}</span>
                </div>
            </button>
        </div>  );
}
 
export default LikeB;