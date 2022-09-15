import React  from "react";
import Searchbar from "../SearchBar/SearchBar";

const Filters = () =>{
    return(
        <div>
            <Searchbar/>
            <h1>Filtros</h1>
            <p>Categoria</p>
            <select class="form-select">
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
            <select class="form-select">
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
            <select class="form-select">
                <option value="SinOrden">Sin orden</option>
                <option value="Mayoramenor">Mayor a menor</option>
                <option value="Menor a mayor">Menor a mayor</option>
            </select>
        </div>
    )
}

export default Filters