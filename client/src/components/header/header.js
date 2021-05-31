import React, {useContext, useEffect, useState} from "react";

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
    const [pc, setPc] = useState(false)
    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const bookedPcHandler = () => {
        localStorage.removeItem("Booked PC")
    }
    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem("Booked PC"))
        setPc(newData)
    }, [bookedPcHandler])

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
            {pc &&
            <div className={headerStyles.bookedPc}>
                <div className={headerStyles.header}>{pc.header}</div>
                <div className={headerStyles.idPc}>{pc.id + 1} пк</div>
                <div className={headerStyles.price}><span>{pc.price}</span> грн час</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" height="36px" width="36px" className={headerStyles.cross} onClick={bookedPcHandler}>
                    <path d="M21.734375 19.640625L19.636719 21.734375C19.253906 22.121094 18.628906 22.121094 18.242188 21.734375L13 16.496094L7.761719 21.734375C7.375 22.121094 6.746094 22.121094 6.363281 21.734375L4.265625 19.640625C3.878906 19.253906 3.878906 18.628906 4.265625 18.242188L9.503906 13L4.265625 7.761719C3.882813 7.371094 3.882813 6.742188 4.265625 6.363281L6.363281 4.265625C6.746094 3.878906 7.375 3.878906 7.761719 4.265625L13 9.507813L18.242188 4.265625C18.628906 3.878906 19.257813 3.878906 19.636719 4.265625L21.734375 6.359375C22.121094 6.746094 22.121094 7.375 21.738281 7.761719L16.496094 13L21.734375 18.242188C22.121094 18.628906 22.121094 19.253906 21.734375 19.640625Z" fill="#FFFFFF" />
                </svg>
            </div>}
            <div className={headerStyles.profile_icon} onClick={logoutHandler}>
                <img src={profileIcon} alt="profileIcon"/>
            </div>
        </header>
    )
}
