//import react library
import React, { useState, useEffect } from "react";

//import modal style properties
import '../../../style/modals/default_modal_component_style.css';

//import custom created react components
import DefaultModal from "../default_modal_component";
import FlexBox from "../../atoms/other/flexbox";
import { DefaultLink, DefaultText, ImageText } from "../../atoms/texts/texts";
import { DefaultImage } from "../../atoms/images/images";
import { DefaultButton, ImageButton } from "../../atoms/buttons/buttons";
import { InformationViewComponent } from "../../atoms/other/component_boxes";
import { Vr } from "../../atoms/other/component_blocks";

//import material ui pie chart
import { PieChart } from '@mui/x-charts';

//import custom react hooks
import { BottomControlBarVisibilityStateHook, BottomControlBarVisibilityStateHookProps, CloseMachineCreatorModalHook, CloseMachineCreatorModalHookProps, MachineCreatorNavigationHook, MachineCreatorStateProps } from "../../hooks/state_hooks";

//import ts functions
import { setConsoleMessage } from "../../../functions/tools/messages";
import { TextAreaInput, TextInput, TextInputWithHeader } from "../../atoms/text_input/text_input";
import { CheckBox, NumericInput, RadioButton, SelectComponent } from "../../atoms/input/input";
import { passwordGenerator } from "../../../functions/tools/password_generator";
import { MachineInformationDataHookProps, MachineInformationHook } from "../../hooks/data_hooks";
import { fileChooserDialogExport, fileChooserDialogImport } from "../../../functions/tools/input_output";

//define interface for machine crator modal properties
interface MachineCreatorModalInterface {
    machineDataInformationModalActive: boolean | undefined,
}

//create machine creator modal
const MachineCreatorModal: React.FC<MachineCreatorModalInterface> = (props: MachineCreatorModalInterface) => {
    //get custon react hook to close machine creator modal
    const { closeMachineCreatorModalState, updateMachineCreatorModalState } = CloseMachineCreatorModalHook(props.machineDataInformationModalActive);
    //get custom react hook to navigate page views
    const { machineCreatorNavigation, updateMachinCreatorNavigation } = MachineCreatorNavigationHook();
    //get custom react hook to close machine creator modal
    //const {closeMachineCreator, updateMachineCreatorHook } = CloseMachineCreatorHook();
    //create instance of machine creator bottom control bar visiblity state hook
    const { bottomControlBarState, updateBottomControlBarVisibility } = BottomControlBarVisibilityStateHook();

    //update machine creator modak active hook
    //updateMachineCreatorHook(props.machineDataInformationModalActive);

    //return created machine creator modal ui
    return (
        <DefaultModal modalTitle="Machine Creator" style={{width: '50%'}} modalCloseButton={true}
            modalTitleImage="assets/images/icons/general/Icon_Droid_IOS_White.png" modalActive={closeMachineCreatorModalState}>
            <MachineCreatorModalStepBar machineCreatorNavigation={machineCreatorNavigation} updateMachinCreatorNavigation={updateMachinCreatorNavigation} bottomControlBarState={bottomControlBarState} updateBottomControlBarVisibility={updateBottomControlBarVisibility}/>
            <MainViewManager machineCreatorNavigation={machineCreatorNavigation} updateMachinCreatorNavigation={updateMachinCreatorNavigation} closeMachineCreatorModalState={closeMachineCreatorModalState} updateMachineCreatorModalState={updateMachineCreatorModalState}
                bottomControlBarState={bottomControlBarState} updateBottomControlBarVisibility={updateBottomControlBarVisibility}/>
        </DefaultModal>
    );
}

//export default machine creator component modal
export default MachineCreatorModal;

//create machine creator modal top step bar
function MachineCreatorModalStepBar({machineCreatorNavigation, updateMachinCreatorNavigation, updateBottomControlBarVisibility}: MachineCreatorStateProps & BottomControlBarVisibilityStateHookProps) {
    //define state hook to add machine creator step bar components
    const [stepBarUiItems, setStepBarUiItems] = useState([]);

    //add effect to pass threw items
    useEffect(() => {
        //read json file to set read data to state hook
        fetch('assets/data/machine_creator_step_bar_options.json')
            .then(jsonResponse => jsonResponse.json())
            .then(jsonData => setStepBarUiItems(jsonData))
            .catch(readJsonFileError => setConsoleMessage(readJsonFileError, true))
    }, []);

    //define function to set machine creator page view
    function setMachineCreatorPageView(passedPageViewValue: string) {
        //check if current active page is the same clicked
        if(machineCreatorNavigation !== passedPageViewValue){
            //set new active page view 
            updateMachinCreatorNavigation(passedPageViewValue);
            //check if to set bottom control bar or not
            updateBottomControlBarVisibility(passedPageViewValue !== 'mcsbFinish' ? true : false)
        }
    }

    //return created machine creator step bar
    return (
        <div id="machineCreatorStepBar" className="machine-creator-step-bar-style-properties">
            <FlexBox style={{alignItems: 'center'}}>
                {
                    //set all top step bar components
                    stepBarUiItems && stepBarUiItems.map((currentStepBarComponent, componentCounter) => (
                        <>
                            {currentStepBarComponent['stepBarComponentText'] ? (
                                //set default link component
                                <DefaultLink textID={currentStepBarComponent['stepBarComponentID']} textValue={currentStepBarComponent['stepBarComponentText']}
                                    textLinkAction={() => setMachineCreatorPageView(currentStepBarComponent['stepBarComponentID'])}/>
                            ) 
                            : 
                            (
                                //set default image component
                                <ImageButton buttonID={currentStepBarComponent['stepBarComponentID']} style={{height: '18px', width: '18px'}} buttonImage={currentStepBarComponent['stepBarComponentImage']}
                                    buttonAction={() => setMachineCreatorPageView(currentStepBarComponent['stepBarComponentID'])}/>
                            )}
                            {
                                //check if to set next step arrow
                                componentCounter < (stepBarUiItems.length - 1) && <DefaultImage style={{height: '18px', width: '18px', marginLeft: '1.5%', marginRight: '1.5%'}} imageValue="assets/images/icons/general/Icon_Forward_Next_IOS_White.png"/>
                            }
                        </>
                    ))
                }
            </FlexBox>
        </div>
    )    
}

//create main view manager view
function MainViewManager({machineCreatorNavigation, updateMachinCreatorNavigation, closeMachineCreatorModalState, updateMachineCreatorModalState, bottomControlBarState}: MachineCreatorStateProps & CloseMachineCreatorModalHookProps & BottomControlBarVisibilityStateHookProps) {
    //crate instance of machine creator machine information data hook
    const { machineInformationData, updateMachineInformationData } = MachineInformationHook();
    
    //define machine creator view
    const machineCreatorViews = new Map([
        ["mcsbStart", [false, <MachineCreatorStartView/>]],
        ["mcsbGeneral", [true, <MachineCreatorGeneralView/>]],
        ["mcsbDataRecorderProperties", [true, <MachineCreatorDataRecorderPropertiesView machineInformationData={machineInformationData} updateMachineInformationData={updateMachineInformationData}/>]],
        ["mcsbPlcProperties", [true, <MachineCreatorPlcPropertiesView machineInformationData={machineInformationData} updateMachineInformationData={updateMachineInformationData}/>]],
        ["mcsbMachineSecurity", [true, <MachineCreatorMachineSecurityView machineInformationData={machineInformationData} updateMachineInformationData={updateMachineInformationData}/>]],
        ["mcsbFinish", [true, <MachineCreatorFinishMachineView closeMachineCreatorModalState={closeMachineCreatorModalState} updateMachineCreatorModalState={updateMachineCreatorModalState}/>]]
    ]);
    //get current machine creator view value
    const currentMachineCreatorView = machineCreatorViews.get(machineCreatorNavigation);

    //function to update machine creator navigation path
    function fastPagePropertiesAction(passedNavigationValue: string) {
        //set new value to custom state hook
        updateMachinCreatorNavigation(passedNavigationValue);
    }

    //return matching component
    return (
        <div style={{marginLeft: '2%', marginRight: '2%'}}>
            {
                //check if to set split/ full view to machine creator modal
                currentMachineCreatorView && currentMachineCreatorView[0] ? 
                (
                    <FlexBox>
                        <div className="left-side-machine-creator-container-style-properties">
                            <DefaultImage style={{height: '90px', width: 'auto'}} imageValue="assets/images/icons/animated/Icon_Machine_IOS_White_Animated.gif"/><br/><br/>
                            <DefaultText textStyle={{fontWeight: 'bold', fontSize: '18px', color: '#509CF5'}} textValue={machineInformationData[0]['textValue']}/>
                            <div style={{marginTop: '8%', marginLeft: '6%', marginRight: '6%'}}>
                                <DefaultLink textStyle={{color: 'gray', marginLeft: '2%'}} textValue={machineInformationData[1]['textValue']} textLinkImage={`assets/images/icons/general/${machineInformationData[1]['iconValue']}.png`} textLinkAction={() => fastPagePropertiesAction('mcsbDataRecorderProperties')}/>
                                <DefaultLink textStyle={{color: 'gray', marginLeft: '2%'}} textValue={machineInformationData[2]['textValue']} textLinkImage={`assets/images/icons/general/${machineInformationData[2]['iconValue']}.png`} textLinkAction={() => fastPagePropertiesAction('mcsbPlcProperties')}/>
                                <DefaultLink textStyle={{color: 'white', marginLeft: '2%'}} textValue={machineInformationData[3]['textValue']} textLinkImage={`assets/images/icons/general/${machineInformationData[3]['iconValue']}.png`} textLinkAction={() => fastPagePropertiesAction('mcsbPlcProperties')}/>
                                <DefaultLink textStyle={{color: 'white', marginLeft: '2%'}} textValue={machineInformationData[4]['textValue']} textLinkImage={`assets/images/icons/general/${machineInformationData[4]['iconValue']}.png`} textLinkAction={() => fastPagePropertiesAction('mcsbMachineSecurity')}/>
                            </div>
                        </div>
                        <div style={{width: '62%'}}>
                            {
                                //get correct machine creator page view
                                currentMachineCreatorView[1]

                            }
                            {
                                //check if bottom control bar can be set
                                bottomControlBarState && <FlexBox style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <DefaultLink style={{float: 'right', marginRight: '2%'}} textStyle={{fontWeight: 'bold'}} textValue="Go Back" imageStyle={{height: '20px'}} textLinkImage="assets/images/icons/general/Icon_Back_IOS_ONE_Blue.png"/>
                                    <DefaultLink style={{float: 'right', marginRight: '2%'}} textStyle={{fontWeight: 'bold'}} textValue="Next Step" imageStyle={{height: '20px'}} textLinkImage="assets/images/icons/general/Icon_Next_IOS_ONE_Blue.png"
                                        textLinkImageRight/>
                                </FlexBox>
                            }
                        </div>
                    </FlexBox>
                )
                :
                (
                    <div>
                        {
                            //get correct machine creator page view
                            currentMachineCreatorView && currentMachineCreatorView[1]
                        }
                    </div>
                )
            }
        </div>
    )
}

//define machine creator start page view
function MachineCreatorStartView() {
    return (
        <>
            <DefaultText textStyle={{display: 'flex', fontSize: '22px', fontWeight: 'bold', color: '#509CF5', justifyContent: 'center'}} textValue="Create a new Machine"/>            
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <DefaultImage style={{height: '60px', width: 'auto'}} imageValue="assets/images/icons/general/Icon_Edit_IOS_ONE_Blue.png"/>
                <DefaultText textStyle={{userSelect: 'none', textAlign: 'center', fontSize: '16px'}} 
                        textValue="New Machine Info Text"/>
            </div>
            <div>
                <DefaultButton style={{fontWeight: 'bold', fontSize: '16px', padding: '2%', backgroundColor: '#509CF5'}} buttonText="Start Machine Setup"/>
            </div>
        </>
    );
}

//define machine creator general page view
function MachineCreatorGeneralView() {
    //define react state hook to set import existing machine data container display state
    const [importExistingMachineDisplayState, setImportExistingMachineDisplayState] = useState<boolean>(false);
    //define 
    const [importExistingMachineShowMoreDisplayState, setImportExistingMachineShowMoreDisplayState] = useState<boolean>(false);

    //return created general view component
    return (
        <>
            <DefaultText textStyle={{fontWeight: "bold", fontSize: '20px', marginTop: '0'}} textValue="General"/>
            <div className="right-side-machine-creator-container-style-properties" style={{marginTop: '4%'}}>
                <RadioButton inputText="Create new Machine" style={{fontWeight: 'bold'}} inputContainerName="machineCreatorGeneralViewContainer" inputAction={() => setImportExistingMachineDisplayState(false)} inputDefaultCheck={true}/>
                <div id="newMachineComponentContainer" style={{opacity: importExistingMachineDisplayState ? '.4' : '1', pointerEvents: importExistingMachineDisplayState ? 'none' : 'auto', marginLeft: '2%'}}>
                    <TextInputWithHeader textInputID="gvMachineName" textInputHeaderText="Machine Name" style={{minWidth: '100%', padding: '5%', marginTop:'10%'}} textInputPlaceholderText="Enter the Machine Name"/>
                    <TextAreaInput textInputID="tarMachineDescription" textInputHeaderText="Machine Desription" textInputPlaceholderText="Enter the description of your machine"/>

                    <CheckBox inputText="Machine Log Monitoring" style={{marginBottom: '1%'}} inputDefaultCheck/>
                    <CheckBox inputText="Predictive Maintenance Monitor"/>
                    <ImageText textValue='If you allready heave created a similar Machine, use the Import existing Machine option.' style={{marginTop: '2%'}} textStyle={{color: 'gray'}} textLinkImage="assets/images/icons/general/Icon_Information_IOS_Gray.png"/>
                </div>
                <hr style={{marginTop: '-2%', marginBottom: '3%'}}/>
                <RadioButton inputText="Import existing Machine Data" style={{fontWeight: 'bold'}} inputContainerName="machineCreatorGeneralViewContainer" inputAction={() => setImportExistingMachineDisplayState(true)} inputDefaultCheck={false}/>
                <div id="importMachineComponentContainer" style={{opacity: importExistingMachineDisplayState ? '1' : '.4', pointerEvents: importExistingMachineDisplayState ? 'auto' : 'none', marginLeft: '2%'}}>
                    <div style={{marginBottom: '-4%'}}>
                        <DefaultLink textStyle={{fontWeight: 'bold'}} textValue="Import existing Machine Data..." textLinkAction={() => fileChooserDialogImport('.json')} textLinkImage="assets/images/icons/general/Icon_Import_IOS_ONE_Blue.png"/>
                        <ImageText textValue="Machine Name: --"style={{marginBottom: '-2%'}} textLinkImage="assets/images/icons/general/Icon_Machine_IOS_White.png"/>
                        <ImageText textValue="Machine Preset Type: --" style={{marginBottom: '-2%'}} textLinkImage="assets/images/icons/general/Icon_Flash_IOS_White.png"/>
                        <div style={{display: importExistingMachineShowMoreDisplayState ? 'block' : 'none'}}>
                            <ImageText textValue="Variables amount: --" style={{marginBottom: '-2%'}} textLinkImage="assets/images/icons/general/Icon_Variable_IOS_White.png"/>
                            <ImageText textValue="Reserved Storage: --GB" textLinkImage="assets/images/icons/general/Icon_Disk_IOS_White.png"/>
                            <DefaultLink textValue="Open File..." textLinkImage="assets\images\icons\general\Icon_Open_Extra_Window_ONE_Blue.svg"/>
                        </div>
                    </div>
                    <DefaultLink style={{float: 'right', marginRight: '4%'}} textValue={importExistingMachineShowMoreDisplayState ? 'Show less...' : 'Show more...'} textLinkAction={() => setImportExistingMachineShowMoreDisplayState(!importExistingMachineShowMoreDisplayState)}/>
                </div>
            </div>
        </>
    )
}

//define machine creator data recorder properties page view
function MachineCreatorDataRecorderPropertiesView({machineInformationData, updateMachineInformationData}: MachineInformationDataHookProps) {
    //define react hook to set option container active
    const [containerActive, setContainerActive] = useState<boolean>(true);
    //define react hook for machine reset image
    const [dataRecorderPresetNumberValue, setDataRecorderPresetNumberValue] = useState<number>(1);
    //define react hook for automatic data control state
    const [automaticStorageControlState, setAutomaticStorageControlState] = useState<boolean>(false);
    //define react hook to set data transfer time
    const [dataTransferNumberValue, setDataTransferNumberValue] = useState<number>(1);
    //define react hook to set data backup active state
    const [dataBackupActiveState, setDataBackupActiveState] =  useState<boolean>(false);

    //function to set active state of select item for data backup
    function dataBackupTimeOption(stateChangeEvent: React.ChangeEvent<HTMLInputElement>) {
        //set new state to state hook
        setDataBackupActiveState(stateChangeEvent.target.checked);
    }

    //define array with data recorder preset option images
    const dataRecorderPresetImage: string[] = 
        ['Icon_Small_IOS_White', 'Icon_Medium_IOS_White', 'Icon_Expanded_IOS_White', 'Icon_Flash_IOS_White'];

    //define array with machine data transfer images
    const machineDataTransferImages: string[] = 
        ['Icon_Stopwatch_IOS_White', 'Icon_Chess_Clock_IOS_White', 'Icon_Clock_IOS_White', 'Icon_Hourglass_IOS_White'];

    //create machine creator data recorder properties data object
    const dataRecorderPropertiesChartDataObject = [
        {value: 73, color: 'gray'},
        {value: 150, color: 'green'},
        {value: 25, color: 'red'},
        {value: 5, color: '#509CF5'}
    ];

    //return created data recorder properties view component
    return (
        <>
            <ImageText style={{fontWeight: "bold", fontSize: '20px', whiteSpace: 'nowrap', marginTop: '0'}} textValue="Data Recorder Properties" textLinkImage="assets\images\icons\general\Icon_Data_Recorder_IOS_White.png"/>
            <div className="right-side-machine-creator-container-style-properties">
                <InformationViewComponent componentBoxesId="generalRecorderPropertiesComponentBox" style={{marginTop: '-4%'}} componentBoxesHeaderText="General Recorder Properties" componentBoxesExpanded={true}>
                    <RadioButton inputContainerName="dataRecorderPropertiesContainer" textStyle={{fontWeight: 'bold'}} inputText="Data Recorder Presets" inputAction={() => setContainerActive(true)} inputDefaultCheck={true}/>
                    <div id="dataRecorderPresetsContainer" style={{marginTop: '1%', marginLeft: '4%', opacity: containerActive ? '1' : '.4', pointerEvents: containerActive ? 'auto' : 'none'}}>
                        <SelectComponent inputID="dataRecorderPresetSelect" style={{padding: '2%', marginTop: '3%'}} inputImage={`assets/images/icons/general/${dataRecorderPresetImage[dataRecorderPresetNumberValue]}.png`} selectInputAction={(currentSelectComponentItem) => setDataRecorderPresetNumberValue(Number(currentSelectComponentItem.target.value))}>
                            <option value={0}>Compact Data Recorder</option>
                            <option value={1} selected>Standard Data Recorder</option>
                            <option value={2}>Expanded Data Recorder</option>
                            <option value={3}>Performance Data Recorder</option>
                        </SelectComponent>
                        <ImageText textValue='Please note, that a more performant Data Recorder will use more storage.' style={{marginTop: '1%'}} textStyle={{color: 'gray'}} textLinkImage="assets/images/icons/general/Icon_Information_IOS_Gray.png"/>
                    </div>
                    <hr style={{marginTop: '-2%', marginBottom: '3%'}}/>
                    <RadioButton inputContainerName="dataRecorderPropertiesContainer" textStyle={{fontWeight: 'bold'}} inputText="Custom Data Recorder Properties" inputAction={() => setContainerActive(false)}/>
                    <div id="customDataRecorderPropertiesContainer" style={{marginTop: '1%', marginLeft: '4%'}}>
                        <FlexBox style={{justifyContent: 'space-between', marginTop: '4%'}}>
                            <div style={{width: '49%'}}>
                                <PieChart series={[
                                    {
                                        data: dataRecorderPropertiesChartDataObject,
                                        highlightScope: {faded: 'global', highlighted: 'item'},
                                        faded: { innerRadius: 20, additionalRadius: -20, color: 'white'},
                                        innerRadius: 20,
                                        outerRadius: 70,
                                        paddingAngle: 3,
                                        cornerRadius: 5,
                                        startAngle: -90,
                                        endAngle: 180,
                                        cx: 65,
                                        cy: 50
                                    }
                                ]}/>
                                <DefaultText textStyle={{fontWeight: 'bold'}} textValue="Total Storage: --GB"/><br/>
                                <DefaultText textStyle={{color: 'gray', fontWeight: 'bold'}} textValue="Free Storage: --GB"/><br/>
                                <DefaultText textStyle={{color: 'green', fontWeight: 'bold'}} textValue="Backup: --TB"/><br/>
                                <DefaultText textStyle={{color: 'red', fontWeight: 'bold'}} textValue="Using: --GB"/><br/>
                                <DefaultText textStyle={{color: '#509CF5', fontWeight: 'bold'}} textValue="Machine Storage: --GB"/>
                            </div>
                            <Vr/>
                            <div style={{width: '49%', opacity: containerActive ? '.4' : '1', pointerEvents: containerActive ? 'none' : 'auto'}}>
                                <CheckBox inputText="Automatic Storage Control" inputAction={() => setAutomaticStorageControlState(!automaticStorageControlState)}/>
                                {
                                    !automaticStorageControlState && <div style={{marginLeft: '4%', marginTop: '6%'}}>
                                        <NumericInput inputText="Machine Variable Value" inputPlaceholderText="Set the Number of Machine variables"/>
                                        <NumericInput inputText="Reserverd Storage" inputPlaceholderText="Set the Storage value"/>
                                    </div>
                                }
                            </div>
                        </FlexBox>
                    </div>
                </InformationViewComponent>
                <hr/>
                <InformationViewComponent componentBoxesId="dataTransferComponentBox" style={{marginTop: '-4%'}} componentBoxesHeaderText="Data Transfer" componentBoxesExpanded={true}>
                    <DefaultText textStyle={{fontWeight: 'bold', fontSize: '17px'}} textValue="Data Recorder Transfer Speed"/>
                    <SelectComponent inputID="dataTransferTimeSelect" style={{padding: '2%', marginTop: '2%'}} inputImage={`assets/images/icons/general/${machineDataTransferImages[dataTransferNumberValue]}.png`} selectInputAction={(currentDataTransferTimeItem) => setDataTransferNumberValue(Number(currentDataTransferTimeItem.target.value))} inputResetValue={true}>
                        <option value={0}>Direct Transfer (5ms)</option>
                        <option value={1} selected>Active Transfer (1min.)</option>
                        <option value={2}>Active Overview Transfer (30min.)</option>
                        <option value={3}>Overview Transfer (1h)</option>
                    </SelectComponent>
                    <div style={{marginTop: '2.5%'}}>
                        <CheckBox inputText="Data Cloud Backup" inputAction={dataBackupTimeOption} inputResetValue={true}/>
                        <div style={{marginLeft: '2%', opacity: dataBackupActiveState ? '1' : '.7', pointerEvents: dataBackupActiveState ? 'auto' : 'none'}}>
                            <SelectComponent inputID="Select" style={{padding: '2%', marginTop: '2%'}} inputImage="assets/images/icons/general/Icon_Data_Backup_IOS_White.png">
                                <option value="">Daily Backup</option>
                                <option value="" selected>Weekly Backup</option>
                                <option value="">Monthly Backup</option>
                                <option value="">Yearly Backup</option>
                            </SelectComponent>
                        </div>
                    </div>
                    <ImageText textValue='Please note, that a higher transfer speed while use more resources.' style={{marginTop: '1%', marginLeft: '-2%'}} textStyle={{color: 'gray'}} textLinkImage="assets/images/icons/general/Icon_Information_IOS_Gray.png"/>
                </InformationViewComponent>
            </div>
        </>
    )
}

//define machine creator plc properties page view
function MachineCreatorPlcPropertiesView({machineInformationData, updateMachineInformationData}: MachineInformationDataHookProps) {
    //define hook for machine manufacturer image name
    const [plcManaufacturerImage, setPlcManaufacturerImage] = useState<string | undefined>('Siemens');
    //define hook for connection type image
    const [connectionTypeImage, setConnectionTypeImage] = useState<string | undefined>('Ethernet');

    //function to set plc manufacuturer logo
    function updateManufacuturerLogo(passedManufacturerImageValue?: string) {
        //set new image value
        setPlcManaufacturerImage(passedManufacturerImageValue);
    }

    //function to set connection type logo
    function updateConnectionTypeImage(passedConnectionTypeImageValue?: string) {
        //set new image value
        setConnectionTypeImage(passedConnectionTypeImageValue);
    }

    //return created plc properties container
    return (
        <>
            <ImageText style={{fontWeight: "bold", fontSize: '20px', whiteSpace: 'nowrap', marginTop: '0'}} textValue="PLC Properties" textLinkImage="assets\images\icons\general\Icon_CPU_IOS_White.png"/>
            <div className="right-side-machine-creator-container-style-properties">
                <InformationViewComponent componentBoxesId="manufacturerComponenBox" style={{marginTop: '-4%'}} componentBoxesHeaderText="PLC Manufacturer" componentBoxesExpanded={true}>
                    <FlexBox style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: '-4%'}}>
                        <SelectComponent style={{fontSize: '17px', fontWeight: 'bold', marginLeft: '-3%'}} selectInputAction={(currentSelectComponentItem) => updateManufacuturerLogo(currentSelectComponentItem.target.value)}>
                            <option value="Siemens">SIEMENS</option>
                            <option value="Rockwell_Automation">Rockwell Automation</option>
                            <option value="Beckhoff">Beckhoff Automation</option>
                            <option value="Schneider_Electric">Schneider Electric</option>
                            <option value="Mitsubishi_Electric">Mitsubishi Electric</option>
                            <option value="Yokogawa">Yokogawa</option>
                        </SelectComponent>
                        <DefaultImage style={{maxWidth: '42.5%', borderRadius: '0'}} imageValue={`assets/images/logos/external/plc_manufacturers/Icon_${plcManaufacturerImage}_Logo.png`}/>
                    </FlexBox>
                </InformationViewComponent>
                <hr/>
                <InformationViewComponent componentBoxesId="communicationComponentBox" style={{marginTop: '-4%'}} componentBoxItemContainerStyle={{marginBottom: '-2%'}} componentBoxesHeaderText="Communication" componentBoxesExpanded={true}>
                    <FlexBox style={{alignItems: 'center', marginBottom: '4%'}}>
                        <DefaultImage style={{width: '20px', height:'20px', marginRight: '2%'}} imageValue={`assets/images/icons/general/Icon_${connectionTypeImage}_IOS_White.png`}/>
                        <SelectComponent selectInputAction={(currentSelectConnectionTypeItem) => updateConnectionTypeImage(currentSelectConnectionTypeItem.target.value)}>
                            <option value="Ethernet">Ethernet</option>
                            <option value="Wifi">Wi-Fi</option>
                        </SelectComponent>
                    </FlexBox>
                    <TextInputWithHeader textInputID="ppPlcIpV4Address" textInputHeaderText="IP-Address (IPv4)" textInputPlaceholderText="Enter the IPv4-Address"/>
                    <TextInputWithHeader textInputID="ppPlcIpV6Address" textInputHeaderText="IP-Address (IPv6)" textInputPlaceholderText="Enter the IPv6-Address"/>
                    <CheckBox inputID="cbEncryptedDataTransfer" style={{marginBottom: '3%'}} textStyle={{fontSize: '16px'}} inputText="Enrypted Data Transfer" inputDefaultCheck={true}/>
                </InformationViewComponent>
                <hr/>
                <InformationViewComponent componentBoxesId="donwloadsComponentBox" style={{marginTop: '-4%'}} componentBoxesHeaderText="Downloads" componentBoxesExpanded={false}>
                    <div id="functionBlockDownloadPropertiesContainer" style={{marginTop: '-4%'}}>
                        <ImageText textValue='Function Block Name: --' style={{marginBottom: '-2%'}} textLinkImage="assets/images/icons/general/Icon_Function_IOS_White.png"/>
                        <ImageText textValue='Size: --MB' textLinkImage="assets/images/icons/general/Icon_Disk_IOS_White.png"/>
                    </div>
                    <DefaultLink textStyle={{fontWeight: 'bold'}} textValue={`Download Communication Block`} textLinkAction={() => alert('download_communication_block')}
                        textLinkImage="assets/images/icons/general/Icon_Download_IOS_ONE_Blue.png"/>
                </InformationViewComponent>
                <DefaultLink textValue='Not findig the PLC Manufacturer you looking for?' textLinkURL="https://www.apple.com" textLinkImage="assets/images/icons/general/Icon_Help_IOS_ONE_Blue.png"/>
            </div>
        </>
    )
}

//define machine creator machine security page view
function MachineCreatorMachineSecurityView({machineInformationData, updateMachineInformationData}: MachineInformationDataHookProps) {
    //define react hook to set password
    const [generatedPassword, setGeneratedPassword] = useState<string>();

    //function to set no password/ password locked state to hook
    function passwordLockInformation(passedLockInformationValue: number) {
        //check which information to set
        if(passedLockInformationValue === 0) {
            //set mahchine not secured data
            updateMachineInformationData(4, {...machineInformationData[4], textvalue: 'Password Locked', iconValue: 'Icon_Lock_IOS_White'});
        }
        else {
            //set machine secured data
            updateMachineInformationData(4, {...machineInformationData[4], textValue: 'Not Secured', iconValue: 'Icon_Unlock_IOS_White'});
        }
    }

    //return created machine security view
    return (
        <>
            <ImageText style={{fontWeight: "bold", fontSize: '20px', whiteSpace: 'nowrap', marginTop: '0'}} textValue="Machine Security" textLinkImage="assets\images\icons\general\Icon_Security_IOS_White.png"/>
            <div className="right-side-machine-creator-container-style-properties">
                <InformationViewComponent componentBoxesId="msPasswordComponentBox" style={{marginTop: '-4%'}} componentBoxesHeaderText="Password" componentBoxesExpanded={true}>
                    <div className="right-side-machine-creator-container-style-properties">
                        <RadioButton inputContainerName="passwordLockSetContainer" inputText="No Security" inputAction={() => passwordLockInformation(0)} inputDefaultCheck={true}/>
                        <RadioButton inputContainerName="passwordLockSetContainer" inputText="Password Lock" inputAction={() => passwordLockInformation(1)}/>
                        <div id="passwordSetContainer">
                            <TextInput textInputImageValue="assets/images/icons/general/Icon_Password_Lock_IOS_White.png" textInputPlaceholderText="Set Machine Password" textInputPasswordSet={false} textInputTextValue={generatedPassword}/>
                            <DefaultLink textValue="Create Password" textLinkAction={() => setGeneratedPassword(passwordGenerator(20, true, true))}/>
                        </div>
                    </div>
                    <CheckBox inputID="machineTwoFactorAuthentication" inputText="Two-Factor Authentication (2FA)"/>
                    <CheckBox inputID="passwordAutoReset" inputText="Password Auto Reset"/>
                </InformationViewComponent>
                <hr/>
                <InformationViewComponent componentBoxesId="" style={{marginTop: '-4%'}} componentBoxesHeaderText="" componentBoxesExpanded={true}>

                </InformationViewComponent>
            </div>
        </>
    )
}

//define machine creator finish machine page view
function MachineCreatorFinishMachineView({updateMachineCreatorModalState}: CloseMachineCreatorModalHookProps) {
    //check which image to set to the top
    const state = true;
    const topImageValue = state ? 'Icon_Check_IOS_Green' : 'Icon_Error_IOS_Red';
    const topTextValue = state ? 'Your new Machine is finally setup. Click Create Machine to create the Machine and to add it to your Machine Manager.' : 
        'There is still requested data missing. Please make sure, you provided all the necessary data to create a Machine.';

    //function for bottom button click action
    function saveMachineSetup(){
        //open file chooser to select folder to save setup
        fileChooserDialogExport();
    }

    //function for create machine button
    function createMachine(){


        //set close state to cusotm modal visibilty hook
        updateMachineCreatorModalState(false);
    }

    //return created finish machine view
    return (
        <>
            <ImageText style={{fontWeight: "bold", fontSize: '20px', whiteSpace: 'nowrap', marginTop: '0'}} textValue="Create & Finish Machine" textLinkImage="assets\images\icons\general\Icon_Finish_IOS_White.png"/>
            <div className="right-side-machine-creator-container-style-properties">
                <div className="create-finish-information-text-container-style-properties">
                    <DefaultImage style={{height: '60px'}} imageValue={`assets/images/icons/general/${topImageValue}.png`}/><br/><br/>
                    <DefaultText textStyle={{userSelect: 'none', textAlign: 'center', fontSize: '16px', marginTop: '-5%', marginLeft: '3%', marginRight: '3%'}} 
                        textValue={topTextValue}/>
                </div>
                <div className="create-finish-bottom-container-style-properties">
                    <ImageText style={{marginBottom: '0'}} textStyle={{color: 'gray'}} textValue="Please Notice: If you wan´t to store a Setup File with all
                        of the Machine Data, click Save Machine Setup." textLinkImage="assets/images/icons/general/Icon_Information_IOS_Gray.png"/>
                    <hr/>
                    <FlexBox style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <DefaultLink textStyle={{fontSize: '16px'}} imageStyle={{height: '20px', width: '20px'}} textValue="Save Machine Setup" textLinkAction={saveMachineSetup} textLinkImage="assets/images/icons/general/Icon_Save_IOS_ONE_Blue.png"/>
                        <DefaultButton style={{backgroundColor: '#509CF5', padding: '2%', fontWeight: 'bold', fontSize: '14px', pointerEvents: state ? 'auto' : 'none', opacity: state ? '1': '.5'}} buttonText="Create Machine"
                            buttonAction={createMachine}/>
                    </FlexBox>
                </div>
            </div>
        </>
    )
}