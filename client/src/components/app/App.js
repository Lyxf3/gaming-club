import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "../../routes";


import './App.css'

function App() {
    const routes = useRoutes(false)

    return (
        <Router className="app">
            {routes}
        </Router>
    )
}

export default App;
