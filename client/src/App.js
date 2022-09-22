import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home/Home'
import NavBar from './componentes/NavBar/NavBar'

import Usuarios from './componentes/Usuarios/Usuarios'
import UserForm from './componentes/Usuarios/UserForm';
import LandingPage from './componentes/LandingPage/LandingPage';
import Donations from './componentes/Donations/Donations';
import AskQuestion from './componentes/Preguntas/AskQuestion'
import AnswerList from "./componentes/answers/AnswerList";
import TOS from './componentes/Home/TOS';
import CommentList from "./componentes/comments/CommentList";
import Error404 from './componentes/Error404/Error404';
import QuestionDetail from './componentes/Preguntas/QuestionDetail';

function App() {
  return (
   <Router>  
   <Routes>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/NavBar' element={<NavBar/>}/>
    <Route path='/Usuarios' element={<Usuarios/>}/>
    <Route path='/UserForm' element={<UserForm/>}/>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/Donacion' element={<Donations/>}/>
    <Route path='/AskQuestion' element={<AskQuestion/>}/>
    <Route path='/answers/:questionId' element={<AnswerList/>}/>
    <Route path='/TOS' element={<TOS/>}/>
    <Route path='/comments/:questionId' element={<CommentList/>}/>
    <Route path='/Donations' element={<Donations/>}/>
    <Route path="*" element={<Error404 />} />
    <Route path='QuestionDetail/:id' element={<QuestionDetail/>}/>
   </Routes>
   </Router>
  );
}

export default App;
