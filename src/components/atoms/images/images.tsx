import React from "react";

//import image css file
import '../../../style/atoms/image_style.css';

//set image parameters
interface ImageParameters {
    imageID?: string,
    imageValue: string | undefined,
    style?: React.CSSProperties
}

//create and export default image component
export const DefaultImage: React.FC<ImageParameters> = (props: ImageParameters) => {
    //return image component
    return (
        <img id={props.imageID} src={props.imageValue} style={{...props.style}}/>
    );
}