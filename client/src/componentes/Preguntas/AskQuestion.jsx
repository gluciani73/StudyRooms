import React,{useState,useEffect} from "react";
import {addQuestions, getQuestions} from "../../Controllers/Actions/questionsActions"
import {useDispatch} from "react-redux";
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
    

    const dispatch= useDispatch()
    const [input,setInput]=useState({
        userId:1,
        title:"",
        description:"",
        categories:[],
    });
    const [errors,setErrors] = useState({})
    

   
     function handleSubmit(e){
        e.preventDefault();
        dispatch(addQuestions(input))
        alert("Create Question")
        setInput({
            userId:1,
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
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }
        ));
        
    }

    function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                [e.target.name]:e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }
            ));
        }
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
                    <div className="mb-3 form-check container">
                        <div className="row">                  
                      
                            <div className="col">
                                <input type="checkbox" className="form-check-input" name="categories" value="Math" onChange={(e)=>handleCheck(e)}  />
                                <label className="radio">Math</label>
                                
                            </div>
                            <div className="col">
                                <input type="checkbox" className="form-check-input" name="categories" value="History" onChange={(e)=>handleCheck(e)}  />
                                <label className="form-check-label" >History</label>
                            </div>
                            <div className="col">
                                <input type="checkbox" className="form-check-input" name="categories" value="Geography" onChange={(e)=>handleCheck(e)}  />
                                <label className="form-check-label" >Geography</label>
                            </div>
                            <div className="col">
                                <input type="checkbox" className="form-check-input" name="categories" value="Chemisty"  onChange={(e)=>handleCheck(e)}  />
                                <label className="form-check-label" >Chemistry</label>
                            </div>
                            <div className="col">
                               <input type="checkbox" className="form-check-input" name="categories" value="Biology" onChange={(e)=>handleCheck(e)}  />
                                <label className="form-check-label" >Biology</label>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" name="categories" value="Economics" onChange={(e)=>handleCheck(e)}  />
                                    <label className="form-check-label" >Economics</label>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" name="categories" value="Programming" onChange={(e)=>handleCheck(e)}  />
                                    <label className="form-check-label" >Programming</label>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" name="categories" value="Philosophy" onChange={(e)=>handleCheck(e)}  />
                                    <label className="form-check-label" >Philosophy</label>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" name="categories" value="Lenguages" onChange={(e)=>handleCheck(e)}  />
                                    <label className="form-check-label" >Lenguages</label>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" name="categories" value="English" onChange={(e)=>handleCheck(e)}  />
                                    <label className="form-check-label" >English</label>
                                </div>
                        </div>
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