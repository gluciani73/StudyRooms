import {logDelete} from "../../Controllers/Actions/questionsActions"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const LogDel = () => {
    const dispatch = useDispatch();
    const check = useSelector((state)=>state.questionReducer.detail.data)
    const navigate = useNavigate();
    const [input,setInput]= useState ({
        active : true
    })

    function handleClick(e){
        
        let id = check[0].id        
        e.preventDefault();
            dispatch(logDelete(id, input))
            setInput({
                active:false
            })
            navigate('../home')
        }

   
        return (<div>

            <button onClick={e =>handleClick(e)}>
                <div>
                Delete Question
                </div>
            </button>
        </div>  );
}
        
export default LogDel;