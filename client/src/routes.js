import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {TarifsPage} from './pages/tarifs-page/tarifsPage'
import {TournamentsPage} from "./pages/tournaments-page/tournamentsPage";
import {AboutPage} from "./pages/about-us/aboutPage";
import {ContactsPage} from "./pages/contacts-page/contactsPage";
import Login from "./components/auth/login";
import SendEmail from "./components/auth/sendEmail";
import Register from "./components/auth/register";


export const useRoutes = (isAuthenticated) => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <AboutPage />
                </Route>
                <Route path="/tariffs" exact>
                    <TarifsPage />
                </Route>
                <Route path="/tournaments">
                    <TournamentsPage />
                </Route>
                <Route path="/contacts">
                    <ContactsPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth/register" exact>
                <Register />
            </Route>
            <Route path="/auth/login" exact>
                <Login />
            </Route>
            <Route path="/auth/sendEmail" exact>
                <SendEmail />
            </Route>
            <Redirect to="/auth/register" />
        </Switch>
    )
}