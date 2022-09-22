import React  from "react";
import { useDispatch, useSelector } from "react-redux";

const Filters = () =>{

    // const dispatch = useDispatch();

  
    // useEffect(()=>{  
    //   dispatch(getQuestions())},[dispatch]);

    //   function handleFilterCategory(e){
    //     dispatch(filterQuestionCategory(e.target.value)) //falta asignar action
    // }
    // function handleSortRating(e){
    //     e.preventDefault();
    //     dispatch(orderByRating(e.target.value))
    //     setCurrentPage(1)
    //     setOrdenbyRating(`Ordenado ${e.target.value}`)
    // }

    return(
        <div>
            <h1>Filtros</h1>
            <p>Categoria</p>
            <select className="form-select" onChange={e=>handleFilterCategory(e)}>
                <option value="todas">Todas</option>
                <option value="Ingles">Ingles</option>
                <option value="Matematicas">Matematicas</option>
                <option value="Historia">Historia</option>
                <option value="Geografia">Geografia</option>
                <option value="Quimica">Quimica</option>
                <option value="Biologia">Biologia</option>
                <option value="Economia">Economia</option>
                <option value="Filosofia">Filosofia</option>
                <option value="Lenguas">Lenguas</option>
            </select>
            <p>Categoria secundaria</p>
            <select className="form-select" onChange={e=>handleFilterCategory(e)}>
                <option value="todas">Todas</option>
                <option value="Ingles">Ingles</option>
                <option value="Matematicas">Matematicas</option>
                <option value="Historia">Historia</option>
                <option value="Geografia">Geografia</option>
                <option value="Quimica">Quimica</option>
                <option value="Biologia">Biologia</option>
                <option value="Economia">Economia</option>
                <option value="Filosofia">Filosofia</option>
                <option value="Lenguas">Lenguas</option>
            </select>
            <p>Rating</p>
            <select className="form-select" onChange={e=>handleSortRating(e)}>
                <option value="SinOrden">Sin orden</option>
                <option value="Mayoramenor">Mayor a menor</option>
                <option value="Menoramayor">Menor a mayor</option>
            </select>
        </div>
    )
}

export default Filters