import React, {useEffect, useState} from 'react'
import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";
import components from "../../modules/components.module.css";

import ParticlesComponent from "../../components/particles-background/ParticlesComponent";

import "./authPage.css"
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        login: "", email: "", password: ""
    })


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <>
            <form className="auth">
                <span className={titles.title}>Регистрация аккаунта</span>
                <div className="input-field">
                    <label htmlFor="login">Логин</label>
                    <input
                        className={components.input_validate}
                        placeholder="LyxF3"
                        id="login"
                        type="text"
                        name="login"
                        onChange={changeHandler}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input
                        className={components.input_validate}
                        placeholder="test_1@gmail.com"
                        id="email"
                        type="text"
                        name="email"
                        onChange={changeHandler}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Пароль</label>
                    <input
                        className={components.input_validate}
                        placeholder="********"
                        id="password"
                        type="password"
                        name="password"
                        onChange={changeHandler}
                    />
                </div>
                <div className="card-action">
                    <button
                        className={buttons.btn_dark}
                        disabled={loading}
                    >
                        Войти</button>
                    <button
                        className={buttons.btn_white}
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Подтвердить</button>
                </div>
            </form>
            <ParticlesComponent />
        </>
    )
}