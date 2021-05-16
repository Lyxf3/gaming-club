import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {TarifsPage} from './pages/tarifs-page/tarifsPage'
import {TournamentsPage} from "./pages/tournaments-page/tournamentsPage";
import {AboutPage} from "./pages/about-us/aboutPage";
import {ContactsPage} from "./pages/contacts-page/contactsPage";
import {AuthPage} from "./pages/auth-page/authPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
         <Switch>
             <Route path="/" component={AboutPage} exact />
             <Route path="/tariffs" component={TarifsPage} />
             <Route path="/tournaments" component={TournamentsPage} />
             <Route path="/contacts" component={ContactsPage} />
             <Route render={() => <h1>404 not found</h1>} />
         </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth" component={AuthPage} />
            <Redirect to="/auth"/>
        </Switch>
    )
}