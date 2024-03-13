import React from "react";

//import text input css file
import '../../../style/atoms/text_input_style.css';

//import created react component
import FlexBox from "../other/flexbox";
import { DefaultImage } from "../images/images";
import { DefaultText } from "../texts/texts";

//set text input parameter interface
interface TextInputParameters {
    textInputID?: string,
    textInputHeaderText?: string,
    textInputTextValue?: string,
    textInputPlaceholderText?: string,
    textInputImageValue?: string | undefined,
    textInputPasswordSet?: boolean | undefined,
    style?: React.CSSProperties
}

//create and export text input component
export const TextInput: React.FC<TextInputParameters> = (props: TextInputParameters) => {
    //check which text input type to set
    const textInputType = (!props.textInputPasswordSet) ? "text" : "password";

    //return created text input component
    return (
        <FlexBox style={{alignItems: 'center'}}>
            {
                //check if image can be added to component
                props.textInputImageValue && <DefaultImage style={{height: '22px', width: '22px'}} imageValue={props.textInputImageValue}/>
            }
            <input id={props.textInputID} type={textInputType} className="text-input-component-style-properties" style={props.style} value={props.textInputTextValue} placeholder={props.textInputPlaceholderText}/>
        </FlexBox>
    );
}

//create text input with header component
export const TextInputWithHeader: React.FC<TextInputParameters> = (props: TextInputParameters) => {
    return (
        <div id={props.textInputID} className="text-input-with-header-container-style-properties">
            <DefaultText textStyle={{fontWeight: 'bold', fontSize: '14px', marginLeft: '5%'}} textValue={props.textInputHeaderText}/>
            <TextInput textInputPasswordSet={props.textInputPasswordSet} textInputImageValue={props.textInputImageValue} textInputTextValue={props.textInputTextValue} style={props.style} textInputPlaceholderText={props.textInputPlaceholderText}/>
        </div>
    )
}

//create text area input with optional header component
export const TextAreaInput: React.FC<TextInputParameters> = (props: TextInputParameters) => {
    return (
        <div id={props.textInputID} style={props.style} className="text-area-container-style-properties">
            <DefaultText textStyle={{fontWeight: 'bold', fontSize: '14px', marginLeft: '2%', marginBottom: '2%'}} textValue={props.textInputHeaderText}/>
            <textarea placeholder={props.textInputPlaceholderText}/>
        </div>
    );
}