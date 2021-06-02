import React, {useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {StaticInput} from "../../components/authPageItems";

import './contactsPage.css'
import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";

import email from '../../details/icons/nav/email.png'
import location from '../../details/icons/nav/location.png'
import phone from '../../details/icons/nav/phone.png'

export const ContactsPage = () => {
    const {loading, request, error, clearError} = useHttp()

    const [form, setForm] = useState({
        name: "", phone: ""
    })
    const requestACallInputs = [
        {labelValue: "Имя", id: "name", name: "name", value: form.name},
        {labelValue: "Номер", id: "phone", name: "phone", value: form.phone}
    ]
    useEffect(async () => {
        if (error !== null) {
            await alert(error)
            setForm({name: "", phone: ""})
        }
        clearError()
    }, [error, clearError])

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
                <StaticInput
                    id={id}
                    {...itemProps}
                    changeHandler={(e) => changeHandler(e)}/>
            </div>
        )
    })

    const requestACallHandler = async () => {
        try {
            const data = await request('/api/contacts', 'POST', {...form})
            await alert(data.message)
            setForm({name: "", phone: ""})
        } catch (e) {}
    }

    return (
        <>
            <div className="content">
                    <div className="request_a_call">
                        <h2 className={titles.title}>Заказать звонок</h2>
                        <div className="inputs">
                            {inputs}
                        </div>
                        <div className="card-action">
                            <button
                                className={buttons.btn_white}
                                style={{
                                    width: "500px"
                                }}
                                onClick={(e) => requestACallHandler(e)}
                                disabled={loading}
                            >
                                Заказать!</button>
                        </div>
                    </div>
                    <div className="location">
                        <div className="location_map">
                            <iframe title="My Daily Marathon Tracker"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5270780220735!2d30.41841441585791!3d50.44990899528472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc3ff13d631d%3A0xd86f4fb09b57f8a!2z0YPQuy4g0JzQsNGI0LjQvdC-0YHRgtGA0L7QuNGC0LXQu9GM0L3QsNGPLCA0MSwg0JrQuNC10LIsIDAzMDY3!5e0!3m2!1sru!2sua!4v1622144538824!5m2!1sru!2sua"

                            />
                        </div>
                        <div className="location_icons">
                            <div className="item">
                                <a href="https://goo.gl/maps/mVfvmr4Afwex3FC49" className="icon"><img src={location} alt="instagram"/></a>
                                <a href="https://goo.gl/maps/mVfvmr4Afwex3FC49" className="text">Вул. Машинобудівна 41</a>
                            </div>
                            <div className="item">
                                <a href="tel:380508087584" className="icon"><img src={phone} alt="telegram"/></a>
                                <a href="tel:380508087584" className="text">+38 050 808 75 84</a>
                            </div>
                            <div className="item">
                                <a href="mailto:gaming.club@gmail.com" className="icon"><img src={email} alt="telegram"/></a>
                                <a href="mailto:gaming.club@gmail.com" className="text">gaming.club@gmail.com</a>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}