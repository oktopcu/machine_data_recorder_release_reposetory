//import react library 
import React, { useState } from "react";

//import modal style properties
import '../../../style/modals/default_modal_component_style.css';

//import custom created react components
import DefaultModal from "../default_modal_component";

//define interface for machine data information modal
interface MachineDataInformationModalInterface {
    machineDataInformationModalTitle?: string,
    machineDataInformationModalActive: boolean | undefined,

}

//create machine data information modal
const MachineDataInformationModal: React.FC<MachineDataInformationModalInterface> = (props: MachineDataInformationModalInterface) => {

    //return created machine data information modal
    return (
        <DefaultModal modalTitle={props.machineDataInformationModalTitle} style={{width: '30%'}} modalActive={props.machineDataInformationModalActive}>

        </DefaultModal>
    );
}  

//export default modal
export default MachineDataInformationModal;