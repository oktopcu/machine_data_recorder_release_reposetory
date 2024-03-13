import React from "react";

//import texts css file
import '../../../style/atoms/text_style.css';

//import created react components
import { DefaultImage } from "../images/images";
import FlexBox from "../other/flexbox";

//set text parameters
interface TextParameters {
    textID?: string,
    textValue: string | number | undefined,
    textLinkImage?: string | undefined,
    textLinkImageRight?: boolean,
    textLinkHoverText?: string,
    textLinkURL?: string | undefined,
    textLinkAction?: () => void,
    className?: string,
    style?: React.CSSProperties,
    textStyle?: React.CSSProperties,
    imageStyle?: React.CSSProperties
}

//create and export default text component
export const DefaultText: React.FC<TextParameters> = (props: TextParameters) => {
    //return created default text component
    return (
        <span id={props.textID} style={{...props.textStyle}}>{props.textValue}</span>
    );
}

//create and export image/ text component
export const ImageText: React.FC<TextParameters> = (props: TextParameters) => {
    //return created image/ text component
    return (
        <p id={props.textID} className="image-text-container-style-properties" style={props.style} onClick={() => props.textLinkAction}>
            <DefaultImage style={{height: '22px', width: '22px', ...props.imageStyle}} imageValue={props.textLinkImage}/>
            <DefaultText textStyle={{marginLeft: '2%', ...props.textStyle}} textValue={props.textValue}/>
        </p>
    );
}

//create and export default link component
export const DefaultLink: React.FC<TextParameters> = (props: TextParameters) => {
    //function to open link
    const openLink = () => {
        //check if to open link 
        if(props.textLinkURL) {
            //open link 
            window.open(`${(!props.textLinkURL.includes('https://')) ? 'https://' : ''}${props.textLinkURL}`, "_blank");
        }

        //check if to execute passed function
        if(props.textLinkAction && !props.textLinkURL) {
            //execute function
            props.textLinkAction();
        }
    }

    return (
        <p className={`default-link-container-style-properties ${props.className}`} style={{...props.style}} onClick={openLink} title={props.textLinkHoverText}>    
            <FlexBox style={{alignItems: 'center'}}>
                {
                    //check left side image can be set
                    !props.textLinkImageRight && props.textLinkImage && <DefaultImage style={{height: '24px', width: '24px', marginRight: '2%', ...props.imageStyle}} imageValue={props.textLinkImage}/>
                }
                <a id={props.textID} style={{fontWeight: 'normal', ...props.textStyle}}>{props.textValue}</a>
                {
                    //check if right side image can be set
                    props.textLinkImageRight && props.textLinkImage && <DefaultImage style={{height: '24px', width: '24px', marginRight: '2%', ...props.imageStyle}} imageValue={props.textLinkImage}/>
                }
            </FlexBox>
        </p>
    );
}