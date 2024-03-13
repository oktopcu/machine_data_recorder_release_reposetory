import React, { ReactNode, useState } from "react";

//import component boxes css file
import '../../../style/atoms/component_boxes_style.css';
import FlexBox from "./flexbox";
import { ImageButton } from "../buttons/buttons";

//set component boxes parameters
interface ComponentBoxesParameters {
    componentBoxesId?: string,
    componentBoxesHeaderText?: string,
    componentBoxesTitle?: string,
    componentBoxesExpanded: boolean,
    componentAction?: () => void,
    children?: ReactNode,
    style?: React.CSSProperties,
    componentBoxItemContainerStyle?: React.CSSProperties
}

//create and export information card component
export const InformationCard: React.FC<ComponentBoxesParameters> = (props: ComponentBoxesParameters) => {
    return (
        <div id={props.componentBoxesId} style={{...props.style}} className="information-card-style-properties" title={props.componentBoxesTitle}
            onClick={props.componentAction}>{props.children}</div>
    );
}

//create and export multi button container component
export const MultiButtonContainer: React.FC<ComponentBoxesParameters> = (props: ComponentBoxesParameters) => {
    return (
        <div id={props.componentBoxesId} className="multi-button-container-style-properties" style={props.style}>
            <FlexBox>{props.children}</FlexBox>
        </div>
    );
}

//create and export grid component 
export const GridComponent: React.FC<ComponentBoxesParameters> = (props: ComponentBoxesParameters) => {
    return (
        <div id={props.componentBoxesId} style={{...props.style}} className="grid-component-style-properties">{props.children}</div>
    );
}

//create and export information view component
export const InformationViewComponent: React.FC<ComponentBoxesParameters> = (props: ComponentBoxesParameters) => {
    //define state to expand/ collapse view container
    const [expandCollapseViewContainer, setExpandCollapseViewContainer] = useState<boolean | undefined>(props.componentBoxesExpanded);

    //define function to expand/ collapse view container
    function changeExpandCollapseViewContainerState () {
        //change view container state
        setExpandCollapseViewContainer(!expandCollapseViewContainer)
    }

    return (
        <div id={props.componentBoxesId} className="information-view-component-style-properties">
            <FlexBox style={{justifyContent: 'space-between', alignItems: 'center', ...props.style}}>
                <h3 style={{marginLeft: '2%', color: 'gray'}}>{props.componentBoxesHeaderText}</h3>
                <ImageButton style={{justifyContent: 'center', alignItems: 'center',  height: '26px', width: '26px'}} buttonImage={(expandCollapseViewContainer) ? '/assets/images/icons/general/Icon_Collapse_IOS_White.png' : '/assets/images/icons/general/Icon_Expand_IOS_White.png'} buttonAction={changeExpandCollapseViewContainerState}/>
            </FlexBox>
            {
                //check if information container can be visible
                expandCollapseViewContainer && <div style={{marginLeft: '3%', marginRight: '3%', marginBottom: '3%', ...props.componentBoxItemContainerStyle}}>{props.children}</div>
            }
        </div>
    );
}