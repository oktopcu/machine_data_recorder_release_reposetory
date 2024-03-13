import React, { ReactNode, useEffect, useState } from 'react';

//import machine manager default page css files
import '../../../../style/style.css';
import '../../../../style/routes/machine_manager_page_style.css';

//import functions from function file
import { setConsoleMessage } from '../../../../functions/tools/messages';

//import custom created react components
import FlexBox from '../../../atoms/other/flexbox';
import { ImageButton, TopMenuBarButton } from '../../../atoms/buttons/buttons';
import { VertivalSpacer } from '../../../atoms/other/component_blocks';
import { DefaultLink, DefaultText } from '../../../atoms/texts/texts';
import { InformationCard } from '../../../atoms/other/component_boxes';
import MachineDataInformationModal from '../../../modals/action_modals/machine_data_information_modal';

//import custom created hooks
import { OverviewManagerProps, OverviewManagerViewHook } from '../../../hooks/state_hooks';

//create and export default machine manager overview view
export default function MachineManagerOverviewView() {
    //get custom react hook for page view manager
    const { overviewViewState, updateOverViewState } = OverviewManagerViewHook();

    return (
        <div className='default-route-page-style'>
            <MachineManagerMachineOverviewTabBar overviewViewState={overviewViewState} updateOverViewState={updateOverViewState}/>
            <OverviewViewManager overviewViewState={overviewViewState} updateOverViewState={updateOverViewState}/>
            <DefaultLink textID='refreshMachineOverviewData' style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center', marginTop: '3%'}} textStyle={{fontSize: '18px', marginLeft: '8%'}} textValue='Refresh...' 
                textLinkAction={() => alert('refresh_machine_overview_data')} textLinkImage='assets/images/icons/general/Icon_Refresh_IOS_ONE_Blue.png'/>
        </div>
    )
}

//create machine manager machine overview tab bar
function MachineManagerMachineOverviewTabBar({overviewViewState, updateOverViewState}: OverviewManagerProps) {
    //define read menu option values
    const [machineManagerOverviewValues, setMachineManagerOverviewValues] = useState<any[] | null>(null);

    //read json file with overview page options
    useEffect(() => {
        //read json data and set to state hook variable
        fetch('assets/data/machine_manager_overview_view_options.json')
            .then(jsonResponse => jsonResponse.json())
            .then(jsonData => setMachineManagerOverviewValues(jsonData))
            .catch(readJsonFileError => setConsoleMessage(readJsonFileError, true));
    });

    //define function to 
    function setActivePageView(passedManagerOverviewButtonID: string) {
        //set active page view button name
        updateOverViewState(passedManagerOverviewButtonID);
    }

    //return created machine manager machine overview tab bar
    return (
        <div id='machineManagerOverviewTopMenuBarContainer' style={{marginBottom: '2%'}} className='machine-manager-overview-top-bar-style-properties'>
            <FlexBox style={{alignItems: 'center'}}>
                {
                    //check and add all machine manager overview top bar components
                    machineManagerOverviewValues && machineManagerOverviewValues.map((currentMachineOverviewButtonData) => {
                        //check if to set divider spacer or top menu button component
                        return currentMachineOverviewButtonData['machineManagerOverviewViewType'] === false ? (
                            //set divider component
                            <VertivalSpacer/>
                        )
                        :
                        (
                            //add top menu bar button item
                            <TopMenuBarButton buttonID={currentMachineOverviewButtonData['machineManagerOverviewViewID']} buttonText={currentMachineOverviewButtonData['machineManagerOverviewViewText']} buttonImage={currentMachineOverviewButtonData['machineManagerOverviewViewImage']}
                                buttonHoverText={currentMachineOverviewButtonData['machineManagerOverviewViewHoverText']} menuButtonActive={currentMachineOverviewButtonData['machineManagerOverviewViewID'] === overviewViewState} 
                                buttonAction={() => setActivePageView(currentMachineOverviewButtonData['machineManagerOverviewViewID'])}/>
                        )
                    })
                }
            </FlexBox>
        </div>
    );
}

//create overview viw manager component
export function OverviewViewManager({overviewViewState}: OverviewManagerProps) {
    //define map forn overview views
    const overviewViewOptions = new Map([
        ["mmOverviewView", <OverviewView/>],
        ["mmMachineDataView", <MachineDataView/>],
        ['mmMachineLogView', <MachineLogView/>],
        ['mmPredictiveMaintenanceView', <PredictivMaintenanceView/>],
        ['mmDataRecorderProperties', <DataRecorderPropertiesView/>],
        ["mmMachineProperties", <MachinePropertiesView/>],
        ["mmVariableEditorView", <VariableEditorView/>]
    ]);

    //return current selected overview view
    return (
        <div id='overviewViewParentContainer'>
            {
                //set matching passed value view 
                overviewViewOptions.get(overviewViewState)
            }
        </div>
    );
}

//create overview view component
function OverviewView() {
    return (
        <div id='overviewView' className='machine-overview-grid-style-properties'>
            <MachineOverviewInformationGridComponent machineOverviewInformationComponentID='fastOverviewContainer' machineOverviewInformationComponentHeader='Fast Overview' machineOverviewInformationComponentExpand={false}>

            </MachineOverviewInformationGridComponent>
            <MachineOverviewInformationGridComponent machineOverviewInformationComponentID='generalInformationContainer' machineOverviewInformationComponentHeader='General Information' machineOverviewInformationComponentExpand={true}>

            </MachineOverviewInformationGridComponent>
            <MachineOverviewInformationGridComponent machineOverviewInformationComponentID='generalInformationContainer' machineOverviewInformationComponentHeader='General Information' machineOverviewInformationComponentExpand={true}>

            </MachineOverviewInformationGridComponent>
        </div>
    );
}

//define interface for machine overview information grid component
interface MachineOverviewInforamtionGridComponentInterface {
    machineOverviewInformationComponentID?: string,
    machineOverviewInformationComponentHeader?: string,
    machineOverviewInformationComponentExpand?: boolean,
    children?: ReactNode,
    style?: React.CSSProperties
}

//create new machine overview information grid component
const MachineOverviewInformationGridComponent: React.FC<MachineOverviewInforamtionGridComponentInterface> = (props: MachineOverviewInforamtionGridComponentInterface) => {
    //define react state hook to set modal visiblity state
    const [machineDataInformationModalActive, setMachineDataInformationModalActive] = useState<boolean | undefined>(true);

    //return created machine overview information grid component
    return (
        <div>
            {
                //check if to set machine data information modal to grid component
                props.machineOverviewInformationComponentExpand && <MachineDataInformationModal machineDataInformationModalActive={machineDataInformationModalActive} machineDataInformationModalTitle={props.machineOverviewInformationComponentHeader}/>

            }
            <InformationCard componentBoxesId={props.machineOverviewInformationComponentID} style={{padding: '3%', ...props.style}} componentBoxesExpanded={true}>
                <FlexBox style={{justifyContent: 'space-between'}}>
                    <DefaultText textStyle={{fontWeight: 'bold', fontSize: '19px'}} textValue={props.machineOverviewInformationComponentHeader}/>
                    {
                        //check if expand machine data information modal can be shown
                        props.machineOverviewInformationComponentExpand && <ImageButton style={{height: '22px', width: '22px'}} buttonImage='assets/images/icons/general/Icon_Open_Extra_Window_ONE_Blue.svg'
                            buttonAction={() => setMachineDataInformationModalActive(true)} buttonHoverText='Open Information Modal'/>
                    }
                </FlexBox>
                {props.children}
            </InformationCard>
        </div>
    );
}

//create machine data view component
function MachineDataView() {
    return (
        <div id='machineDataView'>
            machine_data

        </div>
    );
}

//create machine log view component
function MachineLogView() {
    return (
        <div id='machineLogView'>
            machine_log

        </div>
    )
}

//create predictive maintenance view component
function PredictivMaintenanceView() {
    return (
        <div id='VpredictiveMaintenanceView'>
            predictive_maintenance

        </div>
    )
}

//create machine properties view component
function MachinePropertiesView() {
    return (
        <div id='machinePropertiesView'>
            machine_properties

        </div>
    );
}

//create data recorder properties view component
function DataRecorderPropertiesView() {
    return (
        <div id='dataRecorderPropertiesView'>
            data_recorder_properties

        </div>
    );
}

//create view component for variable editor
function VariableEditorView(){
    return (
        <div id='variableEditorView'>
            variable_editor

        </div>
    );
}
