import React from "react";
import {NavLink, Routes, Route} from "react-router-dom";
import SinglePage from "./SinglePage"

const About = () => {

    //You can only return one element from a react component, therefore wrap in <> </>
    return (
        <div className="about__content">
            <ul className="about__list">
                <li>
                    <NavLink to="about-app">About App</NavLink>
                </li>
                <li>
                    <NavLink to="about-author">About Author</NavLink>
                </li>
            </ul>
            

            <Routes>
                <Route path=":slug" element={<SinglePage />} />
            </Routes>

         </div>


    )
}
export default About