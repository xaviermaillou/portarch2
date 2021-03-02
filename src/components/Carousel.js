import React, {useState, useEffect} from "react";
import PanelA from "./PanelA";
import PanelB from "./PanelB";
import Portfolio from "./Portfolio";

const Carousel = (props) => {

    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if((window.innerHeight / window.innerWidth) >= 1) {
            setOpacity(0.25);
            if(props.index === 0) {
                setOpacity(1);
            }
            document.getElementById('carouselsContainer').addEventListener('scroll', function() {
                const scrollPosition = document.getElementById("carousel_" + props.index).getBoundingClientRect().top;
                if(scrollPosition >= 0 && scrollPosition <= (window.innerHeight / 3)) {
                    setOpacity(1);
                } else {
                    setOpacity(0.25);
                }
            });
            
        }
    }, [props.index]);

    return(
        <div id={"carousel_" + props.index} className="carouselContainer" style={{opacity: `${opacity}`}}>
            <PanelA color={props.project.color} title ={props.project.title} />
            <PanelB color={props.project.color} pictures={props.project.detailPics} />
            <Portfolio color={props.project.color} author={props.project.author} />
        </div>
    );
}

export default Carousel;