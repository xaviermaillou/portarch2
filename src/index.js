import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Wrapper from "./Wrapper";
import {UserProvider} from "./contexts/UserContext";

ReactDOM.render( 
    <UserProvider>
        <Wrapper />
    </UserProvider>,
    document.getElementById('root')
); 