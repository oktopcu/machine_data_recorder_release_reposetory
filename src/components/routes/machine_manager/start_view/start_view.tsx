import React, { useEffect, useState } from "react";

//import machine manager start page css file
import '../../../../style/style.css';
import '../../../../style/routes/machine_manager_page_style.css';

//import ts action file
import { openMachinePath } from "./start_view_functions";
import { machineStateImage } from "../../../../functions/tools/machine_state";
import { setConsoleMessage } from "../../../../functions/tools/messages";

//import created react components
import FlexBox from "../../../atoms/other/flexbox";
import { InformationCard, InformationViewComponent, MultiButtonContainer } from "../../../atoms/other/component_boxes";
import { ImageButton, ImageTextButton } from "../../../atoms/buttons/buttons";
import { DefaultImage } from "../../../atoms/images/images";
import { DefaultLink, DefaultText, ImageText } from "../../../atoms/texts/texts";
import { VertivalSpacer } from "../../../atoms/other/component_blocks";
import NumberInputModal from "../../../modals/action_modals/password_input_modal";
import MachineCreatorModal from "../../../modals/action_modals/machine_creator_modal";

//create and export default machine manager page view
export default function MachineManagerStartView(){
    //define state to change between machine option view options
    const [machineViewOptions, setMachineViewOptions] = useState<boolean>(false);

    //define function to change information view
    const changeMachineOptionView = (passedMachineOptionViewValue: boolean) => {
        //check if passed value isn´t the same as current
        if(passedMachineOptionViewValue !== machineViewOptions){
            //set passed state to state variable
            setMachineViewOptions(passedMachineOptionViewValue);
        }
    } 

    return (
        <div className="default-route-page-style">
            <MachineManagerTopOptionsBar changeMachineOptionView={changeMachineOptionView}/>
            {
                //check which view type to set
                !machineViewOptions ? <GridViewMachineOptions/> : <ListViewMachineOptions/>
            }
        </div>
    );
}

//define machine manager top options bar interface
interface MachineManagerTopOptionsBarProperties {
    changeMachineOptionView: (value: boolean) => void
}

//create machine manager top options bar
const MachineManagerTopOptionsBar: React.FC<MachineManagerTopOptionsBarProperties> = (props: MachineManagerTopOptionsBarProperties) => {
    //define state variable to set read data
    const [machineManagerTopMenuOptions, setMachineManagerTopMenuOptions] = useState([]);
    
    //add effect to pass threw items
    useEffect(() => {
        //read machine manager top menu options from json file
        fetch('assets/data/machine_manager_top_menu_options.json')
            .then(jsonResponse => jsonResponse.json())
            .then(jsonData => setMachineManagerTopMenuOptions(jsonData))
            .catch(readJsonFileError => setConsoleMessage(readJsonFileError, true))
    }, []);

    //return created top options bar component
    return (
        <div className="machine-manager-top-options-bar-style-properties">
            <FlexBox style={{justifyContent: 'space-between'}}>
                <FlexBox>
                    <MultiButtonContainer componentBoxesId="machineOptionsToolboxContainer" componentBoxesExpanded={true}>
                        {
                            //load top container buttons
                            machineManagerTopMenuOptions.map((currentTopMenuOption) => {
                                //check if to set button or divider or top option image button
                                return !currentTopMenuOption['machineManagerOverviewViewType'] === false ? (
                                    //set divider component
                                    <VertivalSpacer/>
                                )
                                :
                                (
                                    //set image button component
                                    <ImageButton buttonID={currentTopMenuOption['machineManagerTopMenuOptionID']} style={{height: '24px', width: '24px'}} buttonImage={currentTopMenuOption['machineManagerTopMenuOptionImage']} 
                                        buttonHoverText={currentTopMenuOption['machineManagerTopMenuOptionTitle']}/>
                                )
                            })
                        }
                    </MultiButtonContainer>
                </FlexBox>
                <FlexBox>
                    <MultiButtonContainer componentBoxesId="setMachineOptionsViewTypeContainer" componentBoxesExpanded={true}>
                        <ImageButton buttonID="setGridViewButton" style={{height: '24px', width: '24px', marginRight: '5%'}} buttonImage="/assets/images/icons/general/Icon_Grid_View_IOS_White.png" 
                            buttonAction={() => props.changeMachineOptionView(false)} buttonHoverText="Set Grid view"/>
                        <ImageButton buttonID="setListViewButton" style={{height: '24px', width: '24px'}} buttonImage="/assets/images/icons/general/Icon_List_View_IOS_White.png"
                            buttonAction={() => props.changeMachineOptionView(true)} buttonHoverText="Set List view"/>
                    </MultiButtonContainer>
                </FlexBox>
            </FlexBox>
            <hr style={{backgroundColor: 'gray', borderColor: 'gray', borderRadius: '10px'}}/>
            <MachineCreatorModal machineDataInformationModalActive={true}/>
        </div>
    );
}

//create grid view machine options component
const GridViewMachineOptions = () => {
    //define hook where to load thedata
    const gridViewMachineOptions = useState([]);

    //load all machine objects from database and set to variable


    //return grid view machine options
    return (
        <div>
            <div id="favouriteMachinesContainer" style={{marginBottom: '2%'}}>
                <FlexBox style={{display: 'flex', alignItems: 'center', marginBottom: '2%'}}>
                    <DefaultImage imageValue="/assets/images/icons/general/Icon_Star_Filled_IOS_White.png"/>
                    <DefaultText textStyle={{fontWeight: 'bold', fontSize: '27px', marginLeft: '2%'}} textValue="Favourite Machines" />
                </FlexBox>
                <div id="favouriteMachineOptionsGridViewContainer" className="machine-options-grid-view-style-properties">
                    {
                        //load and add all favourite machine objects to view
                        
                    }
                    <MachineOptionsGridComponent machineOptionMachineTitle="Machine No.2" machineOptionMachineState={0}/>
                </div>
            </div>
            <div id="allMachinesContainer">
                <FlexBox style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1%'}}>
                    <DefaultText textStyle={{fontWeight: 'bold', fontSize: '27px', marginLeft: '1%'}} textValue="All Machines" />
                    <DefaultLink textID="showMoreLessMachineOptions" textStyle={{fontSize: '16px'}} textValue="Show more..."/>
                </FlexBox>
                <div id="allMachineOptionsGridViewContainer" className="machine-options-grid-view-style-properties">
                    {
                        //load all machine objects to view
                        
                    }
                    <MachineOptionsGridComponent machineOptionMachineTitle="Machine No.1" machineOptionMachineState={2} machineOptionPasswordLocked={true}/>
                    <MachineOptionsGridComponent machineOptionMachineTitle="Machine No.2" machineOptionMachineState={1} />
                    <MachineOptionsGridComponent machineOptionMachineTitle="Machine No.3" machineOptionMachineState={3}/>
                    <MachineOptionsGridComponent machineOptionMachineTitle="Machine No.4" machineOptionMachineState={0} machineOptionPasswordLocked={true} />
                </div>
                <DefaultText textID="gridViewMachineCounterText" textStyle={{userSelect: 'none', color: 'gray', fontWeight: 'bold', fontSize: '17px', marginLeft: '1%'}} textValue={`${gridViewMachineOptions.length} Machines`}/>
            </div>
        </div>
    );
}

//define interface for machine option grid component
interface MachineOptionGridComponentProperties {
    machineOptionMachineID?: string
    machineOptionMachineTitle?: string | undefined,
    machinOptionMachineText?: string,
    machineOptionMachineState: number,
    machineOptionPasswordLocked?: boolean,

}

//create grid component for machine options grid view
const MachineOptionsGridComponent: React.FC<MachineOptionGridComponentProperties> = (props: MachineOptionGridComponentProperties) => {
    //define state hook to 
    const [machinePasswordModalOpen, setMachinePasswordModalOpen] = useState<boolean | undefined>(false);
    //use custom react hook to set machine manager header text
    //const { machineManagerHeader, updateMachineHeaderText } = MachineManagerPageHeaderNameHook();

    //function to open machine manager machine overview
    function openClickedMachine() {
        //check if machine is password locked
        if(props.machineOptionPasswordLocked) 
        {
            //open enter machine password modal
            setMachinePasswordModalOpen(true);
        }
        else 
        {

            //call function to set file path of machine overview 
            openMachinePath();
        }
    }

    //return created machine manager grid view component
    return (
        <div>
            {
                //set machine password input modal if machine is password locked
                props.machineOptionPasswordLocked && <NumberInputModal modalActive={machinePasswordModalOpen} modalPassedText={props.machineOptionMachineTitle} modalPassedPassword=""/>
            }
            <InformationCard componentBoxesId={props.machineOptionMachineID} style={{padding: '4%'}} componentAction={openClickedMachine} componentBoxesExpanded={true}>
                <FlexBox>
                    <DefaultImage style={{height: '80px', width: '80px'}} imageValue="/assets/images/icons/general/Icon_Machine_IOS_ONE_Blue.png"/>
                    <div style={{marginLeft: '5%'}}>
                        <FlexBox style={{display: 'flex', alignItems: 'center', marginBottom: '4%'}}>                        
                            <DefaultImage style={{height: '22px', width: '22px'}} imageValue={machineStateImage({passedMachineStateValue: props.machineOptionMachineState})}/>
                            <DefaultText textStyle={{fontWeight: 'bold', fontSize: '20px', marginLeft: '4%'}} textValue={props.machineOptionMachineTitle}/>
                        </FlexBox>
                        <DefaultText textStyle={{color: 'gray'}} textValue="test_machien_description_text"/>
                    </div>
                </FlexBox>
            </InformationCard>  
        </div>
    );
}

//create list view machine options component
const ListViewMachineOptions = () => {
    const listViewMachineOptions = useState([]);
    
    //function to call function to open clicked machine
    function openClickedMachine() {
        //call function to open machine

    }

    //return created list view machine option component
    return (
        <div>
            <FlexBox style={{justifyContent: 'space-between'}}>
                <div style={{width: '63%'}}>
                    <table id="machineOptionsTable" className="machine-options-table-style-properties">
                        <tr style={{color: 'gray', fontSize: '19px'}}>
                            <th></th>
                            <th style={{textAlign: 'left'}}>Machine Name</th>
                            <th style={{textAlign: 'left'}}>Machine Information</th>
                            <th>State</th>
                        </tr>
                        {
                            //add all machine option items to list

                        }
                        <MachineOptionsListComponent machineOptionMachineTitle="test_machine_01" machinOptionMachineText="test_machine_01_information_text" machineOptionMachineState={0}/>
                        <MachineOptionsListComponent machineOptionMachineTitle="test_machine_02" machinOptionMachineText="test_machine_02_information_text" machineOptionMachineState={2}/>
                    </table>
                    <DefaultText textID="gridViewMachineCounterText" textStyle={{userSelect: 'none', color: 'gray', fontWeight: 'bold', fontSize: '17px', marginLeft: '1%'}} textValue={`${listViewMachineOptions.length} Machines`}/>
                </div>
                <div className="right-side-list-view-information-view-style-properties">
                    <h2>Machine Information:</h2>
                    <div id="mainMachineInformationContainer" style={{textAlign: 'center'}}>
                        <DefaultImage style={{height: '80px', width: '80px'}} imageValue="/assets/images/icons/general/Icon_Machine_IOS_ONE_Blue.png"/><br/>
                        <DefaultText textStyle={{fontWeight: 'bold', fontSize: '20px', marginTop: '4%'}} textValue="test_machine"/><br/>
                        <DefaultText textStyle={{color: 'gray'}} textValue="test_machine_information_text"/>
                    </div>
                    <InformationViewComponent componentBoxesId="machineStateContainer" componentBoxesHeaderText="Machine State" componentBoxesExpanded={true}>

                    </InformationViewComponent>
                    <InformationViewComponent componentBoxesId="plcPropertiesContainer" componentBoxesHeaderText="PLC Properties" componentBoxesExpanded={false}>

                    </InformationViewComponent>
                    <InformationViewComponent componentBoxesId="fastACtionContainer" componentBoxesHeaderText="Fast Actions" componentBoxesExpanded={false}>
                        <ImageText textID="addMachineToFavourite" textValue="Add to Favourite" textLinkImage="/assets/images/icons/general/Icon_Star_Filled_IOS_White.png"/>
                        <ImageText textID="configurateMachine" textValue="Configurate Machine..." textLinkImage="/assets/images/icons/general/Icon_Config_IOS_White.png"/>
                        <ImageText textID="deleteCurrentMachine" textStyle={{color: 'red'}} textValue="Delete Machine" textLinkImage="/assets/images/icons/general/Icon_Delete_IOS_Red.png"/>
                    </InformationViewComponent>
                    <ImageTextButton buttonID="connectToMachine" style={{position: 'absolute', width: '94.5%', bottom: '0', marginBottom: '3.5%', backgroundColor: '#509CF5', alignItems: 'center'}} 
                        buttonText="Connect to Machine" buttonImage="/assets/images/icons/general/Icon_Disconnected_IOS_White.png" buttonAction={openClickedMachine}/>
                </div>
            </FlexBox>
        </div>
    );
}

//define interface for machine option list component
interface MachineOptionListComponentProperties {
    machineOptionMachineID?: string
    machineOptionMachineTitle?: string,
    machinOptionMachineText?: string,
    machineOptionMachineState: number
}

//create list view component for machine options list
const MachineOptionsListComponent: React.FC<MachineOptionListComponentProperties> = (props: MachineOptionListComponentProperties) => {
    return (
        <tr id={props.machineOptionMachineID} className="machine-option-list-item-style-properties">
            <td>
                <DefaultImage style={{height: '24px', width: '24px'}} imageValue="/assets/images/icons/general/Icon_Machine_IOS_ONE_Blue.png"/>
            </td>
            <td>
                <DefaultText textStyle={{fontWeight: 'bold', marginLeft: '0.5%'}} textValue={props.machineOptionMachineTitle}/>
            </td>
            <td title={props.machinOptionMachineText}>
                <DefaultText textStyle={{color: 'gray', marginLeft: '0.5%'}} textValue={props.machinOptionMachineText}/>
            </td>
            <td style={{textAlign: 'center'}}>
                <DefaultImage style={{height: '24px', width: '24px'}} imageValue={machineStateImage({passedMachineStateValue: props.machineOptionMachineState})}/>
            </td>
        </tr>
    );
}

//create mahcine manager overview page view
function MachineManagerOverviewPageView() {
    return (
        <div>

        </div>
    );
}