import React, {useState} from "react";
import DarkTheme from "./DarkTheme";
//import LightTheme from "./LightTheme";

const Wrapper = () => {

    const [theme] = useState(0);

    return(
        <>
            {theme === 0 && <DarkTheme />}
        </>
    );
}

export default Wrapper;