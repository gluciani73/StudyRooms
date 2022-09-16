import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Home  from './componentes/Home';
import  LandingPage  from './componentes/Landing page';
import  NavBar  from './componentes/NavBar';
import  Preguntas  from './componentes/Preguntas';
import  SearchBar  from './componentes/SearchBar';
import  Temas  from './componentes/Temas';
import  Usuarios  from './componentes/Usuarios';
import  UserForm  from './componentes/UserForm';
import Donations from './componentes/Donations';
import AnswerList from "./componentes/answers/AnswerList";

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
    <Route path='/answers/:questionId' element={<AnswerList/>}/>

   </Routes>
   </Router>
  );
}

export default App;
