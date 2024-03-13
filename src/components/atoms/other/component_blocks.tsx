//import react library
import React from 'react';

//import component blocks style properties
import '../../../style/atoms/component_blocks_style.css';

//set component blocks parameter interface
interface ComponentBlocksParameters {
    style?: React.CSSProperties
}

//create and export vertical line
export const Vr: React.FC<ComponentBlocksParameters> = (props: ComponentBlocksParameters) => {
    return (
        <div className='vertival-line-style-properties' style={props.style}></div>
    );
}

//create and export vertical spacer
export function VertivalSpacer() {
    return (
        <div className='vertical-spacer-style-properties'></div>
    );
}

//create and export vertical line space
export function VerticalLineSpacer() {
    return (
        <div style={{borderRight: '1px solid white', height: '50px'}}></div>
    )
}

//create and export horizontal spacer
export function HorizontalSpacer() {
    return (
        <div className='horizontal-spacer-style-properties'></div>
    );
}