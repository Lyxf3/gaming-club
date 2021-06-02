import React, {useEffect, useState } from "react";
import {NavLink, withRouter} from "react-router-dom";
import {StaticInput, InputPassword} from "../authPageItems";
import "./authPage.css"

import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";

const Register = ({history}) => {
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        login: "", email: "", password: ""
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    useEffect(async () => {
        if (error !== null) {
            await alert(error)
            setForm({login: "", email: "", password: ""})

        }
        clearError()
    }, [error, clearError])


    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form})
            history.push('/auth/login')
        } catch (e) {}
    }
const register= {
    static: [
        {labelValue: "Логин", id: "login", name: "login", value: form.login},
        {labelValue: "Email", id: "email", name: "email", value: form.email}
    ],
    password: [
        {labelValue: "Пароль", id: "password", name: "password", value: form.password}
    ]
}

    const statInputs = register.static.map( (item) => {
        const {id, ...itemProps} = item;
        return (
            <div key={id} className="input-field">
                <StaticInput
                    {...itemProps}
                    id={id}
                    changeHandler={(e) => changeHandler(e)}/>
            </div>
        )
    })
    const passInput = register.password.map( (item) => {
        const {id, ...itemProps} = item;
        return (
            <div key={id} className="input-field">
                <InputPassword
                    id={id}
                    {...itemProps}
                    changeHandler={(e) => changeHandler(e)}/>
            </div>
        )
    })

    return (
        <>
            <div className="auth">
                <span className={titles.title}>Регистрация аккаунта</span>
                {statInputs}
                {passInput}

                <div className="card-action">
                    <NavLink to={"/auth/login"} exact >
                        <button
                            className={buttons.btn_dark}
                            disabled={loading}>
                                Войти
                        </button>
                    </NavLink>

                    <button
                            className={buttons.btn_white}
                            onClick={(e) => registerHandler(e)}
                            disabled={loading}
                        >
                            Подтвердить</button>
                </div>
            </div>
        </>
        )
}

export default withRouter(Register)