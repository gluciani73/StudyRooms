
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home/Home'
import NavBar from './componentes/NavBar/NavBar'
import {refreshUserInfo} from '../src/Controllers/Actions/loginActions'
import Usuarios from './componentes/Usuarios/Usuarios'
import UserForm from './componentes/Usuarios/UserForm';
import LandingPage from './componentes/LandingPage/LandingPage';
import Donations from './componentes/Donations/Donations';
import AskQuestion from './componentes/Preguntas/AskQuestion'
import AnswerList from "./componentes/answers/AnswerList";
import TOS from './componentes/Home/TOS';
import CommentList from "./componentes/comments/CommentList";
import Profile from  './componentes/Usuarios/Profile'
import Error404 from './componentes/Error404/Error404';
import QuestionDetail from './componentes/Preguntas/QuestionDetail';
import GoogleAuth from './componentes/Usuarios/GoogleAuth'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import UserList from "./componentes/adminPanel/UserList";
import CategoryList from "./componentes/categorias/CategoryList";
import RecoverConfirmation from './componentes/LandingPage/RecoverConfirmation'

function App() {
  const dispatch = useDispatch()
  const tokenData = localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"))
  useEffect(()=>{
    dispatch(refreshUserInfo(tokenData, localStorage.getItem("token")))
  })
  
  return (
   <Router className="bg-black">  
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
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/admin-panel' element={<UserList/>}/>
    <Route path='/categories' element={<CategoryList/>}/>
    <Route path="*" element={<Error404 />} />
    <Route path='QuestionDetail/:id' element={<QuestionDetail/>}/>
    <Route path='/auth/:token' element={<GoogleAuth/>}/>
    <Route path='/recovery' element={<RecoverConfirmation/>}/>
   </Routes>
   </Router>
  );
}

export default App;
