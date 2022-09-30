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
        }else{
        dispatch(deleteLikesQuestions(input))
        }
        dispatch(getDetail(id))
    }
        
        return (<div className="bg-dark" >

            <button onClick={e =>handleSubmit(e)}>
                <div className="bg-primary d-inline-flex">
                <img src={like} alt="" height="20px" className="px-2"/> <p>likes:</p>
                <p>{check[0].votesxquestions.length}</p>

                </div>
            </button>
        </div>  );
}
 
export default LikeB;