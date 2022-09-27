import {logDelete} from "../../Controllers/Actions/questionsActions"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";




const LogDel = () => {
    const dispatch = useDispatch();
    const check = useSelector((state)=>state.questionReducer.detail.data)
    
    const [input,setInput]= useState ({
        active : true
    })

    function handleClick(e){
        
        let id = check[0].id        
        let test = check[0].active
           
        e.preventDefault();
        if(test=true){
            dispatch(logDelete(id, input))
            setInput({
                active:false
            })
 
        }else{
            dispatch(logDelete(id, input))
            setInput({
                active:true
            })

        }}

   
        return (<div>

            <button onClick={e =>handleClick(e)}>
                <div>
                Delete Question
                </div>
            </button>
        </div>  );
}
        
export default LogDel;