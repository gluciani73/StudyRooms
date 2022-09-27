import React,{useState,useEffect} from "react";
import {addQuestions, getQuestions, getCategories} from "../../Controllers/Actions/questionsActions"
import {useDispatch, useSelector} from "react-redux";
import Navbar from '../NavBar/NavBar'


function validate(input){
    let errors={};
    if(!input.title){
        errors.title = "write a title to your question, to help find it"
    }
    if(!input.description){
        errors.description = "write a detailed description of your question"
    }
    if(!input.category){
        errors.categories="select at least 1 category"
    }
    return errors;
}


const AskQuestion = () => {
    
    const userInfo = useSelector((state)=> state.loginReducer.userInfo);
    const dispatch= useDispatch()
    const [input,setInput]=useState({
        userId:userInfo.id,
        title:"",
        description:"",
        categories:[],
    });
    const [errors,setErrors] = useState({})

    const allCategories = useSelector((state)=> state.questionReducer.categories.data)
    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])
    
    const data = allCategories?.map(e => e.category)
    const sortCategories = data?.sort(function(a,b){
        if(a < b){
            return -1
        }
        if(b < a){
            return 1
        }
        return 0
    })

     function handleSubmit(e){
        e.preventDefault();
        dispatch(addQuestions(input))
        alert("Create Question")
        setInput({
            userId:userInfo.id,
            title:"",
            description:"",
            categories:[]
        })
        }

     function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
     
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }
        ));
        
    }

    // function handleCheck(e){
    //     if (e.target.checked){
    //         setInput({
    //             ...input,
    //             [e.target.name]:e.target.value
    //         })
    //         setErrors(validate({
    //             ...input,
    //             [e.target.name]: e.target.value
    //         }
    //         ));
    //     }
    // }
    function handleSelect(e){
        setInput({
            ...input,
            categories:[...new Set([...input.categories, e.target.value])],
        })
    }

     useEffect(()=>{
        dispatch(getQuestions())
     },[dispatch])

    return (
        <div>
            <Navbar/>
                <div className="container border border-secondary">
                    <p className=" fs-2 text-center pt-2"> Make a Question for our community </p>
                    
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div className="mb-3">
                        <label  className="form-label fs-2">Title</label>
                        <input type="text" 
                        className="form-control" 
                        required value={input.name}
                        name="title" 
                        onChange={(e)=>handleChange(e)}
                        />
                        {errors.title && (<p className="error">{errors.name}
                        </p>)}
                        <div className="form-text">this title helps users understand the general idea of your question</div>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label fs-3">Description</label>
                        <input type="text" 
                        className="form-control"
                        name="description" 
                        value={input.description} 
                        onChange={(e)=>handleChange(e)}
                       />
                        {errors.description && (<p className="error">{errors.description}</p>)}
                        <div  className="form-text">Check yout grammar and be as specific as you can!</div>
                    </div>
                    <div>
                        <select onChange={(e)=>handleSelect(e)}>
                            {sortCategories?.map((e)=>{
                                return(
                                    <option key={e} value={e}>{e}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="d-grip gap-2">
                        <button type="submit" className="btn btn-primary p">Submit</button>
                    </div>
                    
                    </form>
                </div>
        </div>
      );
}
 
export default AskQuestion;