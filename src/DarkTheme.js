import React from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import App from "./App";
import Portfolio from "./components/Portfolio";
import "./Dark.css"

const DarkTheme = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/portfolio/:urlID">
                    <div className="exportedPortfolioContainer">
                        <Portfolio />
                    </div>
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default DarkTheme;