import React, {useState} from "react";

const Logo = () => {

    const [menuOpened, setMenuOpened] = useState(false);

    const handleClick = () => {
        if((window.innerHeight / window.innerWidth) >= 1){
            menuOpened ? 
            document.getElementsByClassName("menuContainer ")[0].style.display = "none"
            : document.getElementsByClassName("menuContainer ")[0].style.display = "flex";
            setMenuOpened(!menuOpened);
        }
    }

    return(
        <div className="logoContainer" onClick={() => handleClick()}>

        </div>
    );
}

export default Logo;