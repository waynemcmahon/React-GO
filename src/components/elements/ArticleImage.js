import React, { useState } from 'react';
import { Event }  from '../tracking';

export const ArticleImage= ({ link, image, alt }) => {
    const imgElement = React.useRef(null);
    const [squareImage, setSquareImage] = useState(false);

    const handleSize = image => {
        if (image !== null && image !== undefined) {
            if (+image.naturalWidth === +image.naturalHeight) {
                setSquareImage(true);
            } 
        }    
    } 

    const handleBtnClick = event => {
        Event("GO Activity", "Click", "GO Articles");
    }

    return(
        <a href={link} target="_blank" rel="noopener noreferrer"  onClick={() => { handleBtnClick() }}>
            <div className={squareImage ? "articleList__img square" : "articleList__img"} >
                <img 
                    //ref={ image => handleSize(image) } 
                    //ref={ image => setLoadedImage(image) } 
                    alt={alt} 
                    ref={imgElement}
                    onLoad={()  => handleSize(imgElement.current) }
                    src={image}
                /> 
            </div>
        </a>
    )}