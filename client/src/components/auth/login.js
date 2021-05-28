import React, {useContext, useEffect, useState} from "react";
import {NavLink, withRouter} from 'react-router-dom'
import {StaticInput, InputPassword} from "../authPageItems";
import "./authPage.css"

import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css"
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";
import ParticlesComponent from "../particles-background/ParticlesComponent";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";


const Login = () => {
    // const auth = useAuth()
    const auth = useContext(AuthContext)
    // const {token, login, logout, userId} = useAuth()

    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        login: "", password: ""
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const login = {
        static: [
            {labelValue: "Логин", id: "login", name: "login"},
        ],
            password: [
            {labelValue: "Пароль", id: "password", name: "password"}
        ]
    }
    const statInputs = login.static.map( (item) => {
        if ( typeof item === 'object' && isEmpty(item) ){
            const {id, ...itemProps} = item;
            return (
                <div key={id} className="input-field">
                    <StaticInput
                        {...itemProps}
                        id={id}
                        changeHandler={changeHandler}/>
                </div>
            )
        }
    })
    const passInput = login.password.map( (item) => {
        if ( typeof item === 'object' && isEmpty(item) ){
            const {id, ...itemProps} = item;
            return (
                <div key={id} className="input-field">
                    <InputPassword
                        id={id}
                        {...itemProps}
                        changeHandler={changeHandler}/>
                </div>
            )
        }
    })
    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }
    return (
        <>
            <div className="auth">
                <span className={titles.title}>войти в аккаунта</span>
                {statInputs}
                {passInput}

                <div className="card-action">
                    <NavLink to={"/auth/register"} exact >
                        <button
                            className={buttons.btn_dark}
                            disabled={loading}>
                                Регистрация
                        </button>
                    </NavLink>

                    <NavLink to={"/auth/sendEmail"} exact >
                        <button
                            className={buttons.btn_send_email}
                            disabled={loading}>
                            Забыл Логин?
                        </button>
                    </NavLink>

                <button
                        className={buttons.btn_white}
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Подтвердить</button>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login)