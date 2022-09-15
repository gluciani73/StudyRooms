import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Home  from './componentes/Home/Home';
import  LandingPage  from './componentes/LandingPage/LandingPage';
import  NavBar  from './componentes/NavBar/NavBar';
import  Preguntas  from './componentes/Preguntas/ObtenerPreguntas';
import  SearchBar  from './componentes/SearchBar/SearchBar';
import  Temas  from './componentes/Temas/Temas';
import  Usuarios  from './componentes/Usuarios/Usuarios';
import  UserForm  from './componentes/Usuarios/UserForm';
import Donations from './componentes/Donations/Donations';

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
