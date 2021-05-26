// import React, {useContext, useEffect, useState} from 'react'
// import ParticlesComponent from "../../components/particles-background/ParticlesComponent";
//
// import "./authPage.css"
// import {useMessage} from "../../hooks/message.hook";
// import {useHttp} from "../../hooks/http.hook";
// import {AuthContext} from "../../context/AuthContext";
// import titles from "../../modules/titles.module.css";
// import buttons from "../../modules/buttons.module.css";
// import Login from "../../components/auth/login";
// import {InputPassword, StaticInput} from "../../components/authPageItems";
//
//
// export const AuthPage = (props) => {
//     const auth = useContext(AuthContext)
//     const message = useMessage()
//     const [form, setForm] = useState({
//         login:"", email: '', password: ''
//     })
//
//
//
//     const changeHandler = event => {
//         setForm({ ...form, [event.target.name]: event.target.value })
//     }
//
//     const registerHandler = async () => {
//         try {
//             const data = await request('/api/auth/register', 'POST', {...form})
//             message(data.message)
//         } catch (e) {}
//     }
//
//     const loginHandler = async () => {
//         try {
//             const data = await request('/api/auth/login', 'POST', {...form})
//             auth.login(data.token, data.userId)
//         } catch (e) {}
//     }
//     const register= {
//         static: [
//             {labelValue: "Логин", id: "login", name: "login"},
//             {labelValue: "Email", id: "email", name: "email"}
//         ],
//         password: [
//             {labelValue: "Пароль", id: "password", name: "password"}
//         ]
//     }
//     const statInputs = register.static.map( (item) => {
//         const {id, ...itemProps} = item;
//         return (
//             <div key={id} className="input-field">
//                 <StaticInput
//                     {...itemProps}
//                     id={id}
//                     form={form}
//                     changeHandler={(e) => changeHandler(e)}/>
//             </div>
//         )
//     })
//
//     const passInput = register.password.map( (item) => {
//         const {id, ...itemProps} = item;
//         return (
//             <div key={id} className="input-field">
//                 <InputPassword
//                     id={id}
//                     {...itemProps}
//                     changeHandler={(e) => changeHandler(e)}/>
//             </div>
//         )
//     })
//
//     return (
//         <>
//             <div className="auth">
//                 <span className={titles.title}>Регистрация аккаунта</span>
//                 {statInputs}
//                 {passInput}
//
//                 <div className="card-action">
//                     <button
//                         className={buttons.btn_dark}
//                         onClick={}
//                         disabled={loading}
//                     >
//                         Войти</button>
//                     <button
//                         className={buttons.btn_white}
//                         onClick={(e) => registerHandler(e)}
//                         disabled={loading}
//                     >
//                         Подтвердить</button>
//                 </div>
//             </div>
//         </>
//     )
// }