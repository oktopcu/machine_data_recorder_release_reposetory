//import react library
import React, { useState } from "react";

//import modal style properties
import '../../../style/modals/default_modal_component_style.css';

//import created react components
import DefaultModal from "../default_modal_component";
import { TextInput } from "../../atoms/text_input/text_input";
import { ImageButton } from "../../atoms/buttons/buttons";
import FlexBox from "../../atoms/other/flexbox";
import { DefaultText, ImageText } from "../../atoms/texts/texts";

//import typescript functions from external file
import { openMachinePath } from "../../routes/machine_manager/start_view/start_view_functions";

//define interface for number input modal
interface NumberInputModalProperties {
    modalActive: boolean | undefined,
    modalPassedText: string | undefined,
    modalPassedPassword: string | undefined,
}

//create and export default number input modal
const PasswordInputModal: React.FC<NumberInputModalProperties> = (props: NumberInputModalProperties) => {
    //define state hook for password incorrect in correct
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);

    //create function to 
    function openMachineCheck() {
        //check if password is correct
        if(true) {
            //password correct -> call function to open machine overview view
            openMachinePath();
            //set state -> false
            setPasswordIncorrect(false);
        }
        else 
        {
            //password incorrect set state/ set state -> true
            setPasswordIncorrect(true);
        }
    }

    //create machine password input field placeholder text
    const machinePasswordInputFieldPlaceholderText = (props.modalPassedText) ? `Password for ${props.modalPassedText}` : 'Enter Machine Password';

    //return created password inopt modal
    return (
        <DefaultModal modalTitle="Machine Password" modalTitleImage="assets/images/icons/general/Icon_Password_Lock_IOS_White.png"
            style={{width: '25%'}} modalActive={props.modalActive}>
            <div id="numberInputContainer" style={{marginTop: '3%'}}>
                <FlexBox style={{justifyContent: 'space-between'}}>
                    <div style={{width: '85%'}}>
                        <TextInput style={{padding: '4%', width: '85%'}} textInputPasswordSet={true} textInputPlaceholderText={machinePasswordInputFieldPlaceholderText}/>
                    </div>
                    <ImageButton buttonImage="assets\images\icons\general\Icon_Next_Continue_IOS_Green.png" buttonHoverText="Open Machine Overview" buttonAction={openMachineCheck}/>
                </FlexBox>
                {
                    passwordIncorrect && <DefaultText textStyle={{color: 'red', fontSize: '13px', marginLeft: '2%'}} textValue="Password incorrect!"/>
                }
            </div>
            <div id="bottomNumberInputContainer" style={{marginTop: '2%', marginBottom: '-4%'}}>
                <ImageText textStyle={{color: 'gray'}} textValue="This machine requires a password. Please enter the password to get access." textLinkImage="assets\images\icons\general\Icon_Information_IOS_Gray.png"/>
            </div>
        </DefaultModal>
    );
}

//export modal as default
export default PasswordInputModal;