import React, { useState } from 'react';

//import css style properties
import '../../style/modals/default_modal_component_style.css';

//import created react components
import FlexBox from "../atoms/other/flexbox";
import { DefaultImage } from "../atoms/images/images";
import { DefaultButton } from "../atoms/buttons/buttons";

//define interface for information dialog properties
interface InformationDialogProperties {
    informationDialogTitle: string;
    informationDialogImage: string | undefined;
    informationDialogMessage: string;
    informationDialogActive: boolean | undefined;
}

//define information dialog component
const InformationDialog: React.FC<InformationDialogProperties> = (props: InformationDialogProperties) => {
    //define state for visibility
    const [informationDialogVisible, setInformationDialogVisible] = useState(props.informationDialogActive);

    //method to close information dialog
    const closeInformationDialog = () => {
        //set state to close and call render method
        setInformationDialogVisible(false);
    }

    return (
        <dialog open={informationDialogVisible} className="default-information-dialog-style">
            <FlexBox>
                <DefaultImage imageValue={props.informationDialogImage}/>
                <h2>{props.informationDialogTitle}</h2>
            </FlexBox>
            <p>{props.informationDialogMessage}</p>
            <p>
                <DefaultButton buttonText="Close" buttonAction={closeInformationDialog}/>
            </p>
        </dialog>
    );
}

//export information dialog as default
export default InformationDialog;