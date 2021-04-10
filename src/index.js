import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Portfolio from "./components/Portfolio";
import {UserProvider} from "./contexts/UserContext";

import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

ReactDOM.render( 
    <UserProvider>
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
    </UserProvider>,
    document.getElementById('root')
); 