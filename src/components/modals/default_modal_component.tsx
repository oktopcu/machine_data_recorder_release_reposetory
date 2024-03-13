import React, { ReactNode, useState } from "react"

//import css rules
import '../../style/modals/default_modal_component_style.css';

//import other created react components
import FlexBox from "../atoms/other/flexbox";
import { ImageButton } from "../atoms/buttons/buttons";
import { DefaultImage } from "../atoms/images/images";

//define interface for default modal properties
interface DefaultModalProperties{
    modalTitle?: string | undefined,
    modalTitleImage?: string | undefined,
    modalCloseButton?: boolean,
    modalActive: boolean | undefined,
    style?: React.CSSProperties,
    className?: string | undefined,
    children?: ReactNode
}

//define default modal component
const DefaultModal: React.FC<DefaultModalProperties> = (props: DefaultModalProperties) => {
    //define state for visibility
    const [modalVisible, setModalVisible] = useState(props.modalActive);

    //method to close default modal
    const closeDefaultModal = () => {
        //set visible state to false
        setModalVisible(false);
    }

    //render react component
    return (
        <dialog open={modalVisible} className={`default-modal-style ${props.className}`} style={{...props.style}}>
            <FlexBox style={{alignItems: 'center', justifyContent: 'space-between', marginTop: '-1%', marginLeft: '2%', marginRight: '2%'}}>
                <FlexBox style={{width: '80%', alignItems: 'center'}}>
                    {
                        //check if to set modal title image
                        props.modalTitleImage && <DefaultImage style={{width: '30px', height: '30px', marginRight: '1.5%'}} imageValue={props.modalTitleImage}/>
                    }
                    <h2>{props.modalTitle}</h2>
                </FlexBox>
                {
                    //check if modal close button can be set
                    props.modalCloseButton && <ImageButton style={{width: '25px', height: '25px'}} buttonImage="/assets/images/icons/general/Icon_Close_IOS_White.png" buttonAction={closeDefaultModal}/>
                }
            </FlexBox>
            <div id="modalMaincomponentContainer">{props.children}</div>
        </dialog>
    );
}

//set default props for default modal component
DefaultModal.defaultProps = {
    modalCloseButton: true
}

//export information dialog as default
export default DefaultModal;