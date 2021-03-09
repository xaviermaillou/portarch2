import React, {useState} from "react";
import DarkTheme from "./DarkTheme";
import LightTheme from "./LightTheme";

const Wrapper = () => {

    const [theme, setTheme] = useState(1);

    return(
        <>
            {theme === 0 && <DarkTheme />}
            {theme === 1 && <LightTheme />}
        </>
    );
}

export default Wrapper;