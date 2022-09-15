import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addQuestions, getQuestions} from '../Actions/index';
import {useDispatch, useSelector} from 'react-redux';

function validate(input){
    let errors={};
    if(!input.titulo){
        errors.titulo = "Escribe un titulo para tu pregunta"
    }else if(!input.descripcion){
        errors.descricion = "Escribe tu pregunta en detalle y de manera clara"
    }else if(!input.categorias){
        errors.categorias = "agrega al menos una categoria para la que aplique tu pregunte"
    }
    return errors;
}

const CrearPreguntas = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const categorias = useSelector((state)=>state.categorias)

    const [errors, setErrors] =useState ({});
    const [input, setInput] =useState({
        titulo:"",
        descripcion:"",
        categorias:[]
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.title]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.title]:e.target.title
        }))
    }
    

    function handleSelect(e){
        const categoria = categoria.find(c=>c.id===e.target.value)
        setInput({
            ...input,
            categoriaId: [...input.categoriaId,categoria]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addQuestions(input))
        alert("Pregunta agregada")
        setInput({
            title:"",
            descripcion:"",
            categoria:[]
        })
        history.push('/Home')
    }
    function handleDelete(e){
        setInput({
            ...input,
            categoriaId: input.categoriaId.filter(occ => occ !== e)
        })
    }

    useEffect(()=>{
        dispatch(getQuestions());
    },[dispatch]);
    
    return (
    <div>
        <h1>Escriba su pregunta </h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Titulo:</label>
                <input type="text" required value= {input.title} name="title" onChange={(e)=>handleChange(e)}/>{errors.title && ( <p>{errors.title}</p>)}
            </div>

            <div>
                <label>Descripcion:</label>
                <input type="text" required value= {input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}/>{errors.descripcion && ( <p>{errors.descripcion}</p>)}
            </div>


                <select onChange={(e)=>handleSelect(e)} required>
                    <option value = ''> Categoria...</option>
                    {categorias.map((e)=>(
                        <option value= {e.id}>{e.title}</option>
                    ))}
                </select>
            
            <button> Postear pregunta</button>
        </form>

        <div>
            {input.categoriaId.map(e=>
                <div>
                    <p>{e.title}</p>
                    <button onClick={() => handleDelete(e)}>X</button>
                </div>
            )}

        </div>
        <Link to= '/Home'>
            <button>Go Back</button>
        </Link>
   </div>
);
}
 
export default CrearPreguntas;