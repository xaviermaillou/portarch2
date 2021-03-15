import React, {useState, useEffect} from "react";
import PanelA from "./PanelA";
import PanelB from "./PanelB";
import Portfolio from "./Portfolio";

const Carousel = (props) => {

    const [opacity, setOpacity] = useState(1);
    const [ghostDiv, setGhostDiv] = useState(false);

    useEffect(() => {
        if((window.innerHeight / window.innerWidth) >= 1 && !props.noAuthor) {
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
        if((window.innerHeight / window.innerWidth) <= 1 && props.noAuthor) {
            setGhostDiv(true);
        }
    }, [props.index, props.noAuthor]);

    return(
        <div id={!props.noAuthor ? "carousel_" + props.index : undefined} className="carouselContainer" style={{opacity: `${opacity}`}}>
            <PanelA picture={props.project.mainPicture} title ={props.project.title} id={props.project.id} favorite={props.favorite} />
            <PanelB id={props.project.id} memoir={props.project.memoir} ownProject={props.noAuthor} />
            {!props.noAuthor && <Portfolio author={props.project.author} />}
            {ghostDiv && <div className="ghostDiv" style={{width: `${window.innerWidth - window.innerHeight}px`}}></div>}
        </div>
    );
}

export default Carousel;