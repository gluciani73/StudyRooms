import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Searchbar = ()=>{
//     const dispatch = useDispatch()
//     const [name, setName] = useState('')
// input
//     function handleInputChange(e){
//         e.preventDefault()
//         setName(e.target.value)
//     }
// button
//     function handleSubmit(e){
//         e.preventDefault()
//         dispatch(//dispatch de las actions y pasas (name)
//         )
//     }
    return(
        <div>
            <input type="text" placeholder="Buscar pregunta" class="form-control form-control-sm" style="width"></input>
            <button type="submit" class="btn btn-primary ">Buscar</button>
        </div>
    )
}
export default Searchbar