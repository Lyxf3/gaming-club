import React, {useEffect, useState} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {StaticInput} from "../authPageItems";
import "./authPage.css"
import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";


const SendEmail = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({email: ""})
    const sendEmail = {
        static: [
            {labelValue: "Email", id: "email", name: "email"}
        ],
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const sendEmailHandler = async () => {
        try {
            const data = await request('/api/auth/sendEmail', 'POST', {...form})
            message(data.message)

        } catch (e) {}
    }

    const statInputs = sendEmail.static.map( (item) => {
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

    return (
        <>
            <div className="auth">
                <span className={titles.title}>Отправить данные на почту</span>
                {statInputs}
                <div className="card-action">
                    <NavLink to={"/auth/login"} exact >
                        <button
                            className={buttons.btn_dark}
                            disabled={loading}>
                                Назад
                        </button>
                    </NavLink>

                    <button
                        className={buttons.btn_white}
                        onClick={(e) => sendEmailHandler(e)}
                        disabled={loading}
                    >
                        Подтвердить</button>
                </div>
            </div>
        </>
    )
}

export default withRouter(SendEmail)