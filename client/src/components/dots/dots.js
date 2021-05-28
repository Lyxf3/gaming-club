import React from "react";

import {NavLink} from "react-router-dom";
import dotStyles from "./dots.module.css";

export const Dots = () => {
    return (
        <>
            <nav className="dots">
                <ul className={dotStyles.menu}>
                    <li >
                        <NavLink to={"/"} exact className={dotStyles.dot}  activeClassName={dotStyles.active}>
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"/tariffs"} className={dotStyles.dot}  activeClassName={dotStyles.active}>
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"/tournaments"} className={dotStyles.dot} activeClassName={dotStyles.active}>
                        </NavLink>
                    </li>
                    <li  >
                        <NavLink to={"/contacts"} className={dotStyles.dot}  activeClassName={dotStyles.active}>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
