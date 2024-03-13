import React, { useState } from 'react';

//import modal style properties
import '../../../style/modals/default_modal_component_style.css';

//import created react components
import DefaultModal from "../default_modal_component";
import { GridComponent, InformationCard } from '../../atoms/other/component_boxes';
import { DefaultImage } from '../../atoms/images/images';
import { DefaultLink } from '../../atoms/texts/texts';
import FlexBox from '../../atoms/other/flexbox';

//create and export default fast actions option modal
const FastActionsOptionModal: React.FC<{modalActive: boolean | undefined}> = ({modalActive}) => {
    //read json data file to set option data to state


    //define values/ testing
    const testValues: string[] = ["test", "test", "test" ,"test" , "test", "test", "test", "test"];

    //define fast action text and display option number
    const [showMoreLessOption, setShowMoreLessOption] = useState([false, "Show more..."]);

    //function to show more/ less fast action options
    function showMoreLessFastActionOptions() {
        //check which state is currently active to set new state
        if(!showMoreLessOption[0]){
            //change state to -> show less state
            setShowMoreLessOption([true, "Show less..."]);
        }
        else 
        {
            //change state to -> show more state
            setShowMoreLessOption([false, "Show more..."]);
        }
    } 
    //define items to display
    const displayOptionItems = showMoreLessOption[0] ? testValues : testValues.slice(0, 6);

    //return created visible react component
    return (
        <DefaultModal modalTitle="Fast Action Options" modalTitleImage='/assets/images/icons/general/Icon_Fast_Action_IOS_White.png' modalActive={modalActive}>
            <div style={{marginTop: '1.5%'}}>
                <div id='topFastActionOptionSelectContainer'>
                    <GridComponent componentBoxesExpanded={true}>
                        {
                            //add read fast action state data
                            displayOptionItems.map((currentValue) => {
                                return (
                                    <FastActionOptionComponent fastActionOptionText={currentValue} fastActionOptionImage='/assets/images/icons/general/Icon_Qr_Code_IOS_White.png' fastActionOptionTitleText='default_option_component_title'/>
                                )
                            })
                        }
                    </GridComponent>
                    <FlexBox style={{marginTop: '4%', justifyContent: 'space-between'}}>
                        <FlexBox style={{alignItems: 'center', width: '60%', marginLeft: '1%'}}>
                            <DefaultImage style={{height: '22px', width: '22px', marginRight: '2%'}} imageValue='/assets/images/icons/general/Icon_Information_IOS_Gray.png'/>
                            <span style={{color: 'gray', fontWeight: 'bold'}}>Click Fast Action option to select</span>
                        </FlexBox>
                        <DefaultLink style={{marginRight: '4%'}} textValue={showMoreLessOption[1].toString()} textLinkAction={showMoreLessFastActionOptions}/>
                    </FlexBox>
                </div>
            </div>
        </DefaultModal>
    );
} 

//export modal as default
export default FastActionsOptionModal;

//define internal components
//define interface for fast action option component properties
interface FastActionOptionComponentProperties{
    fastActionOptionText: string,
    fastActionOptionTitleText?: string,
    fastActionOptionImage?: string | undefined
}

//define fast action option component
const FastActionOptionComponent: React.FC<FastActionOptionComponentProperties> = (props: FastActionOptionComponentProperties) => {
    //define component state
    const [fastActionComponentState, setFastActionComponentState] = useState<boolean>(false);

    //check if component was clicked
    const selectFastActionOptionClick = () => {
        //check if state can be changed
        if(!fastActionComponentState)
        {
            //set selected state -> true
            setFastActionComponentState(true);
        }
        else 
        {
            //set selected state -> false
            setFastActionComponentState(false);
        }
    }

    return (
        <div onClick={selectFastActionOptionClick}>
            <InformationCard style={{backgroundColor: '#121212', textAlign: 'center', padding: '3%'}} componentBoxesExpanded={true}>
                <DefaultImage style={{height: '48px', width: '48px', alignItems: 'center', textAlign: 'center'}} imageValue={props.fastActionOptionImage}/>
                <DefaultImage style={{float: 'right', height: '20px', width: 'auto', marginRight: '2%'}} imageValue={(!fastActionComponentState) ? '/assets/images/icons/general/Icon_Circle_IOS_Gray.png' : '/assets/images/icons/general/Icon_Check_IOS_Green.png'}/>
                <br/>
                <span style={{color: '#509CF5'}}>{props.fastActionOptionText}</span>
            </InformationCard>
        </div>
    );
}
