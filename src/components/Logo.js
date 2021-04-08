import React, {useState} from "react";

const Logo = (props) => {

    const [menuOpened, setMenuOpened] = useState(false);

    const handleClick = () => {
        if((window.innerHeight / window.innerWidth) >= 1){
            menuOpened ? 
            document.getElementsByClassName("menuContainer ")[0].classList.remove('opened')
            : document.getElementsByClassName("menuContainer ")[0].classList.add('opened');
            setMenuOpened(!menuOpened);
        } else {
            window.location.reload();
            return false;
        }
    }

    return(
        <div className={ props.intro ? "logoContainer intro" : "logoContainer"} onClick={() => handleClick()}>

        </div>
    );
}

export default Logo;