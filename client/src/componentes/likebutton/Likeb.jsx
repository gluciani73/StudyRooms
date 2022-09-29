import {postLikesQuestions, deleteLikesQuestions} from "../../Controllers/Actions/likesActions"
import { useDispatch, useSelector } from 'react-redux';
import like from '../../recursos/thumbs.png'
import { getDetail } from "../../Controllers/Actions/questionsActions";
import { useParams } from "react-router-dom";



const LikeB = () => {
    const {id} = useParams();

    const dispatch = useDispatch();
    const check2 = useSelector((state)=>state.loginReducer.userInfo.id);

    const input = {
        questionId:id,
        userId:check2
    }


    const check = useSelector((state)=>state.questionReducer.detail.data)


    function handleSubmit(e){
        const test =check[0].votesxquestions.filter((e)=>e.userId === check2)
        
        
        
        e.preventDefault();
        
        if(!test.length){
        dispatch(postLikesQuestions(input))
        alert("Liked")
        }else{
        dispatch(deleteLikesQuestions(input))
        alert("unLiked")
        }
        dispatch(getDetail(id))
    }
        
        return (<div>

            <button onClick={e =>handleSubmit(e)}>
                <div>
                <img src={like} alt="" height="20px"/>
                </div>
            </button>
        </div>  );
}
 
export default LikeB;