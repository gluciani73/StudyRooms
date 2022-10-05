import {logDelete} from "../../Controllers/Actions/questionsActions"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as sweetalert  from "sweetalert";


const LogDel = () => {
    const dispatch = useDispatch();
    const check = useSelector((state)=>state.questionReducer.detail.data)
    const uId = useSelector((state)=> state.loginReducer.userInfo.id);
    const isAdmin = useSelector((state)=> state.loginReducer.userInfo.isAdmin);
    const navigate = useNavigate();
    const [input,setInput]= useState ({
        active : true
    })

    function handleClick(e){
        e.preventDefault();
        let id = check[0].id
        if(uId !== check[0].userId && isAdmin === false){
            sweetalert({
                title:"Action not allowed",
                text: `You can't delete other user's quetions.`
            });
        }else{
            sweetalert({
                title:"Action confirmation",
                text: "Do your really want to delete your answer?",
                icon: "warning",
                buttons: ["Cancel", "Delete"],
                dangerMode: true,
            }).then(value => {
                if(value) {
                    dispatch(logDelete(id))
                    setInput({
                        active:false
                    })
                    navigate('../home')
                }})
           
        }
    }
   
        return (<div>

            <button onClick={e =>handleClick(e)}>
                <div className="bg-danger btn">
                Delete Question
                </div>
            </button>
        </div>  );
}
        
export default LogDel;