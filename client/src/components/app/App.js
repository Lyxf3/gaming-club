import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "../../routes";

import './App.css'
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/AuthContext";
import ParticlesComponent from "../particles-background/ParticlesComponent";
import {Footer} from "../footer/footer";
import {Dots} from "../dots/dots";
import {Header} from "../header/header";

function App() {
    const {token, login, logout, userId} = useAuth()
    let isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)


    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                <div className="app">
                    {isAuthenticated && <Header/>}
                    {isAuthenticated && <Dots/>}
                    {routes}
                    {isAuthenticated && <Footer/>}
                    <ParticlesComponent />
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
