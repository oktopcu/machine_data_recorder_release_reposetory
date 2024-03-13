//import react library
import React from "react";

//import modal css style properties file
import '../../../style/modals/default_modal_component_style.css';

//import custom react components
import DefaultModal from "../default_modal_component";
import { DefaultImage } from "../../atoms/images/images";
import { DefaultText } from "../../atoms/texts/texts";

//create interface for loading modal properties
interface LoadingNodalProperties {
    loadingModalTitle?: string,
    loadingModalActive: boolean | undefined
}

//create loading modal component
const LoadingModal: React.FC<LoadingNodalProperties> = (props: LoadingNodalProperties) => {
    return (
        <DefaultModal className="loading-modal-style-properties" modalCloseButton={false} modalActive={props.loadingModalActive}>
            {
                //check if to set loading modal header text
                props.loadingModalTitle && <DefaultText textStyle={{color: 'white', fontWeight: 'bold', fontSize: '23px', marginTop: '4%'}} textValue={props.loadingModalTitle}/>
            }
            <DefaultImage style={{width: '180px', height: 'auto', textAlign: 'center', marginTop: '-10%', marginBottom: '-16%'}} imageValue="assets/images/icons/animated/Loading_Animation_Dual_Ball_1.svg"/>
            <DefaultText textStyle={{fontWeight: 'bold', fontSize:'19px', color: '#509CF5'}} textValue='Loading...'/>
        </DefaultModal>
    );
}

//export default loading modal
export default LoadingModal;