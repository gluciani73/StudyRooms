import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Componentes/Home/Home'
import NavBar from './Componentes/NavBar/NavBar'
import SearchBar from './Componentes/SearchBar/SearchBar'
import Usuarios from './Componentes/Usuarios/Usuarios'
import Temas from './Componentes/Temas/Temas'
import UserForm from './Componentes/Usuarios/UserForm';
import Preguntas from './Componentes/Preguntas/ObtenerPreguntas';
import LandingPage from './Componentes/LandingPage/LandingPage';
import Donations from './Componentes/Donations/Donations';


function App() {
  return (
   <Router>
   
   <Routes>


    <Route path='/Home' element={<Home/>}/>
    <Route path='/NavBar' element={<NavBar/>}/>
    <Route path='/SearchBar' element={<SearchBar/>}/>
    <Route path='/Usuarios' element={<Usuarios/>}/>
    <Route path='/Temas' element={<Temas/>}/>
    <Route path='/UserForm' element={<UserForm/>}/>
    <Route path='/Preguntas' element={<Preguntas/>}/>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/Donacion' element={<Donations/>}/>

   </Routes>
   </Router>
  );
}

export default App;
