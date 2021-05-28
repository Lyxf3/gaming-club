import React, {useContext, useEffect} from "react";

import headerStyles from "./header.module.css"

import {NavLink} from "react-router-dom";
import logo from "../../details/images/Logo.png";
import profileIcon from "../../details/icons/profile-icon.png";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

export const Header = () => {
    const auth = useContext(AuthContext)
    const {error, clearError} = useHttp()
    const message = useMessage()

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    return (
        <header className="header">
            <NavLink to={"/"} className={headerStyles.logo}><img src={logo} alt="logo"/></NavLink>
            <nav className={headerStyles.nav}>
                <ul className={headerStyles.menu}>
                    <li >
                        <NavLink to={"/"} exact className={headerStyles.item} activeClassName={headerStyles.active}>
                            О нас
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"/tariffs"} className={headerStyles.item} activeClassName={headerStyles.active}>
                            Тарифы
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"/tournaments"} className={headerStyles.item} activeClassName={headerStyles.active}>
                            Турниры
                        </NavLink>
                    </li>
                    <li  >
                        <NavLink to={"/contacts"} className={headerStyles.item} activeClassName={headerStyles.active}>
                            Контакты
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={headerStyles.profile_icon} onClick={logoutHandler}>
                <img src={profileIcon} alt="profileIcon"/>
            </div>
        </header>
    )
}
