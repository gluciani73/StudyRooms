import React, { useState } from 'react';
import { Link } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import comments from '../../recursos/comments.png'
import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'

const Preguntas = () => {

    
    
    return (
    <div>
          
            <div class="px-5">
                <div class="row">
                    <div class="col">
                        <form  class="mb-2">
                            <a class="m-2 text-uppercase fs-1">title question 1</a>
                            <a> <img src={comments} height="20px" alt="comments" />10 </a>
                            <a> <img src={views} height="20px" alt="views" /> 200</a>
                            <a> <img src={upVote} height="20px" alt="thumbs" /> 5</a>
                            <a> <img src={stars} height="20px" alt="stars" /><img src={stars} height="20px" alt="stars" /><img src={stars} height="20px" alt="stars" /></a>
                            <a> 3.5</a>
                        </form>
                    </div>
                </div>
          
                <div class="mb-2 fs-3 px-5">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </div>

            <div class="px-5">
                
                <div class="mb-2 fs-3 col px-5">
                    <a class="text-uppercase fs-5 row">comment 1</a>
                    <a class="fs-5 row">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</a> 
                </div>

            </div>
            
            <div class="px-2">
                
                
                <div class="mb-2 fs-2 col px-5">
                    <a class="text-uppercase fs-2 row"> titulo answer</a>
                    <a class="fs-4 row"> "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </a>
                    <a> <img src={stars} alt="rating" height="20px" /><img src={stars} alt="rating" height="20px" /><img src={stars} alt="rating" height="20px" /><img src={stars} alt="rating" height="20px" /><img src={stars} alt="rating" height="20px" /></a>
                    <a> 5.0</a>
                </div>

            </div>
            
            </div>

        

    </div>
    )
}
 
export default Preguntas;