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
import headerStyles from "../header/header.module.css";

function App() {
    const {token, login, logout, userId, bookPc, bookedPc, bookedPcHandler} = useAuth()
    let isAuthenticated = !!token
    let isBookedPc = !!bookedPc
    const routes = useRoutes(isAuthenticated)

    const onBookedPcHandler = async () => {
        try {
            await bookedPcHandler()
        } catch (e) {}
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated, bookPc, bookedPcHandler, bookedPc
        }}>
            <Router>
                <div className="app">
                    {isBookedPc &&
                    <div className={headerStyles.bookedPc}>
                        <div className={headerStyles.header}>{bookedPc.header}</div>
                        <div className={headerStyles.idPc}>{bookedPc.id + 1} пк</div>
                        <div className={headerStyles.price}><span>{bookedPc.price}</span> грн час</div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" height="36px" width="36px" className={headerStyles.cross} onClick={onBookedPcHandler}>
                            <path d="M21.734375 19.640625L19.636719 21.734375C19.253906 22.121094 18.628906 22.121094 18.242188 21.734375L13 16.496094L7.761719 21.734375C7.375 22.121094 6.746094 22.121094 6.363281 21.734375L4.265625 19.640625C3.878906 19.253906 3.878906 18.628906 4.265625 18.242188L9.503906 13L4.265625 7.761719C3.882813 7.371094 3.882813 6.742188 4.265625 6.363281L6.363281 4.265625C6.746094 3.878906 7.375 3.878906 7.761719 4.265625L13 9.507813L18.242188 4.265625C18.628906 3.878906 19.257813 3.878906 19.636719 4.265625L21.734375 6.359375C22.121094 6.746094 22.121094 7.375 21.738281 7.761719L16.496094 13L21.734375 18.242188C22.121094 18.628906 22.121094 19.253906 21.734375 19.640625Z" fill="#FFFFFF" />
                        </svg>
                    </div>}
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
