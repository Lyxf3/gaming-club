import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {InputPassword} from "../../components/authPageItems";

import './contactsPage.css'
import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";

export const ContactsPage = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        name: "", phone: ""
    })
    const requestACallInputs = [
        {labelValue: "Имя", id: "name", name: "name"},
        {labelValue: "Номер", id: "phone", name: "phone"}
    ]
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

    const inputs = requestACallInputs.map( (item) => {
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

    const requestACallHandler = async () => {
        try {
            // const data = await request('/api/auth/request', 'POST', {...form})
            // message(data.message)
        } catch (e) {}
    }

    return (
        <>
            <div className="content">
                <div className="left-side">
                    <div className="request_a_call">
                        <h2 className={titles.title}>Заказать звонок</h2>
                        <div className="inputs">
                            {inputs}
                        </div>
                        <div className="card-action">
                            <button
                                className={buttons.btn_white}
                                onClick={(e) => requestACallHandler(e)}
                                disabled={loading}
                            >
                                Заказать!</button>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="location">
                        <div className="location_map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5270780220735!2d30.41841441585791!3d50.44990899528472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc3ff13d631d%3A0xd86f4fb09b57f8a!2z0YPQuy4g0JzQsNGI0LjQvdC-0YHRgtGA0L7QuNGC0LXQu9GM0L3QsNGPLCA0MSwg0JrQuNC10LIsIDAzMDY3!5e0!3m2!1sru!2sua!4v1622144538824!5m2!1sru!2sua"
                                width="570"
                                height="515"
                                style="border:0;"
                                allowFullScreen=""
                                loading="lazy" />
                        </div>
                        <div className="location_icons">
                            <div className="item">
                                <a href="#" className="icon"><img src="" alt="instagram"/></a>
                                <a href="https://goo.gl/maps/mVfvmr4Afwex3FC49" className="text">Вул. Машинобудівна 41</a>
                            </div>
                            <div className="item">
                                <a href="#" className="icon"><img src="" alt="telegram"/></a>
                                <a href="tel:380508087584" className="text">+38 050 808 75 84</a>
                            </div>
                            <div className="item">
                                <a href="#" className="icon"><img src="" alt="telegram"/></a>
                                <a href="mailto:gaming.club@gmail.com" className="text">gaming.club@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}