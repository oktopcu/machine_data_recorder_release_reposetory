import React, { ReactNode, useState, useEffect } from "react";

//import input css file
import '../../../style/atoms/input_style.css';

//import created custom react components
import FlexBox from "../../atoms/other/flexbox";
import { DefaultImage } from "../../atoms/images/images";
import { DefaultText } from "../texts/texts";
import { ImageButton } from "../buttons/buttons";

//import ts functions
import { setConsoleMessage } from "../../../functions/tools/messages";

//set input parameters
interface InputParameters {
    inputID?: string,
    inputContainerName?: string,
    inputText?: string,
    inputImage?: string | undefined,
    inputHoverText?: string,
    inputPlaceholderText?: string,
    inputItemDataFile?: string | undefined,
    inputDefaultCheck?: boolean,
    inputResetValue?: boolean,
    inputAction?: (value?: any) => void,
    selectInputAction?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string,
    style?: React.CSSProperties,
    textStyle?: React.CSSProperties,
    children?: ReactNode
}

//create and export select component
export const SelectComponent: React.FC<InputParameters> = (props: InputParameters) => {
    //define react state hook for select component
    const [selectComponentData, setSelectComponentData] = useState([]);

    //use effect to read passed json file
    useEffect(() => {
         //fetch api to read json file (cast input to correct type)
        fetch(props.inputItemDataFile as URL | RequestInfo)
            .then(jsonResponse => jsonResponse.json())
            .then(jsonData => setSelectComponentData(jsonData))
            .catch(readJsonFileError => setConsoleMessage(readJsonFileError, true))
    });

    //return created select component
    return (
        <FlexBox style={{alignItems: 'center'}}>
            {
                //check if image can be set to select component
                props.inputImage && <DefaultImage style={{height: '22px', width: '22px', borderRadius: '0', marginRight: '1%'}} imageValue={props.inputImage}/>
            }
            <select id={props.inputID} className={props.className} style={props.style} onChange={props.selectInputAction} title={props.inputHoverText}>
                {
                    //check if to set custom component or read file data
                    !props.inputItemDataFile ? (
                        //add passed child component by user
                        props.children
                    )
                    :
                    (
                        //add all read select item data elements
                        selectComponentData && selectComponentData.map((currentSelectComponentData) => (
                            //add option item to select component
                            <option value={currentSelectComponentData['selectOptionValue']}>{currentSelectComponentData['selectOptionText']}</option>
                        ))
                    )
                }
            </select>
            {
                //chcek if to set reset value image button
                props.inputResetValue && <ImageButton style={{height: '22px', width: '22px', marginLeft: '3%'}} buttonImage="assets/images/icons/general/Icon_Reset_IOS_ONE_Blue.png" buttonHoverText="Reset the selected value"/>
            }
        </FlexBox>
    )
}

//create and export radio button component
export const RadioButton: React.FC<InputParameters> = (props: InputParameters) => {
    return (
        <div onChange={props.inputAction} title={props.inputHoverText} style={props.style}>
            <FlexBox style={{alignItems: 'center'}}>
                <input id={props.inputID} name={props.inputContainerName} type="radio" defaultChecked={props.inputDefaultCheck}/>
                <DefaultText textStyle={{userSelect: 'none', marginLeft: '2%', ...props.textStyle}} textValue={props.inputText}/>
            </FlexBox>
        </div>
    );
}

//create and export checkbox component
export const CheckBox: React.FC<InputParameters> = (props: InputParameters) => {
    return (
        <div onChange={props.inputAction} title={props.inputHoverText} style={props.style}>
            <FlexBox style={{alignItems: 'center'}}>
                <input id={props.inputID} name={props.inputContainerName} type="checkbox" defaultChecked={props.inputDefaultCheck}/>
                <DefaultText textStyle={{userSelect: 'none',marginLeft: '2%', ...props.textStyle}} textValue={props.inputText}/>
            </FlexBox>
        </div>
    );
}

//create and export numeric input component
export const NumericInput: React.FC<InputParameters> = (props: InputParameters) => {
    return (
        <div title={props.inputHoverText} style={props.style}>
            <DefaultText textStyle={{fontSize: '14px', fontWeight: 'bold', marginLeft: '3%', ...props.textStyle}} textValue={props.inputText}/>
            <input id={props.inputID} type="number" className="numeric-input-style-properties" placeholder={props.inputPlaceholderText}/>
        </div>
    );
}