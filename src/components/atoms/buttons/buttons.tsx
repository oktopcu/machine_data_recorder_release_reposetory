import React from "react";

//import button css file
import '../../../style/atoms/button_style.css';

//import created react components
import { DefaultImage } from "../images/images";
import { DefaultText } from "../texts/texts";

//set button parameters
interface ButtonParameters {
    buttonID?: string,
    buttonHoverText?: string,
    buttonText?: string,
    buttonImage?: string | undefined,
    buttonImagePositionRight?: boolean | undefined,
    menuButtonActive?: boolean,
    buttonAction?: () => void,
    className?: string,
    style?: React.CSSProperties
}

//create and export default button
export const DefaultButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    return (
        <button id={props.buttonID} onClick={props.buttonAction} className={props.className} style={props.style} title={props.buttonHoverText}>
            <DefaultText textValue={props.buttonText}/>
        </button>
    );
}

//create and export image button
export const ImageButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    //return created react component
    return (
        <button id={props.buttonID} onClick={props.buttonAction} className="image-button-style-properties" style={{...props.style}} title={props.buttonHoverText}>
            <DefaultImage style={props.style} imageValue={props.buttonImage}/>
        </button>
    );
}

//create and export roung image button
export const RoundImageButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    return (
        <button id={props.buttonID} className="round-button-style-properties" onClick={props.buttonAction} title={props.buttonHoverText}>
            <DefaultImage style={{height: '32px', width: '32px', borderRadius: '50%'}} imageValue={props.buttonImage}/>
        </button>
    );
}

//create and export image/ text button
export const ImageTextButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    return (
        <button id={props.buttonID} onClick={props.buttonAction} className="image-text-button-style-properties" style={{...props.style}} title={props.buttonHoverText}>
            {
                //check if to set button position left
                !props.buttonImagePositionRight && <DefaultImage style={{height: '24px', width: '24px'}} imageValue={props.buttonImage}/>
            }
            <DefaultText textStyle={{fontWeight: 'bold', marginLeft: '2%', fontSize: '15.5px'}} textValue={props.buttonText}/>
            {
                //check if to set button position right
                props.buttonImagePositionRight && <DefaultImage style={{height: '24px', width: '24px'}} imageValue={props.buttonImage}/>
            }
        </button>
    );
}

//create and export menu button
export const MenuButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    //check if menu button is active or not to set menu button image
    const menuButtonImage = props.menuButtonActive ? props.buttonImage?.replace('Gray', 'White') : props.buttonImage;

    //return custom created menu button
    return (
        <button id={props.buttonID} className="menu-button-style" onClick={props.buttonAction} title={props.buttonHoverText}>
            {
                //check if image can be set
                props.buttonImage && <DefaultImage style={{marginLeft: '4%'}} imageValue={menuButtonImage}/>
            }
            <DefaultText textStyle={{marginLeft: '4%', fontSize: props.menuButtonActive ? '21px' : '19px', color: props.menuButtonActive ? 'white' : 'gray'}} textValue={props.buttonText}/>
        </button>
    );
}

//create and export top menu bar button
export const TopMenuBarButton: React.FC<ButtonParameters> = (props: ButtonParameters) => {
    //check if button is active or not to set top menu button immage
    const topMenuButtonImage = props.menuButtonActive ? props.buttonImage?.replace('Gray', 'White') : props.buttonImage;

    //return custom created top menu bar button
    return (
        <button id={props.buttonID} className="top-menu-bar-button-style-properties" onClick={props.buttonAction} title={props.buttonHoverText}>
            {
                //check if image can be set
                props.buttonImage && <DefaultImage style={{height: '20px', width: '20px'}} imageValue={topMenuButtonImage}/>
            }
            <DefaultText textStyle={{fontWeight: 'bold', fontSize: props.menuButtonActive ? '16px' : '14px', marginLeft: '10%', color: props.menuButtonActive ? 'white' : 'gray'}} textValue={props.buttonText}/>
        </button>
    )
}