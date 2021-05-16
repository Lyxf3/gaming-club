import React from "react";

import headerStyles from "./header.module.css"

import {NavLink} from "react-router-dom";
import logo from "../../details/images/Logo.png";
import profileIcon from "../../details/icons/profile-icon.png";


export const Header = () => {
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
            <div className={headerStyles.profile_icon}>
                <img src={profileIcon} alt="profileIcon"/>
            </div>
        </header>
    )
}
