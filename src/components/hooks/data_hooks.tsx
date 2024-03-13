import { useState } from "react";

//define type for machine manager page header hook
export type MachineManagerPageHeaderType = {
    machineManagerHeader: string;
    updateMachineHeaderText: (value: string) => void;
}

//create custom react hook to set machine manager page header name
export function MachineManagerPageHeaderNameHook() {
    //define react state hook to set page header name
    const [machineManagerHeader, setMachineManagerHeader] = useState<string>('Machine Manager');

    //define function to updata machine header text
    function updateMachineHeaderText(passedMachineManagerHeaderText: string) {
        //set machine manager header text to state hook
        setMachineManagerHeader(passedMachineManagerHeaderText);
    }

    //return machine manager page header custom hook properties
    return { machineManagerHeader, updateMachineHeaderText }
}

//define type for custom machine information data hook
export type MachineInformationDataHookProps = {
    machineInformationData: any;
    updateMachineInformationData: (indexValue: number, textValue: string) => void;
}

//create custom react hook to set machine information data
export function MachineInformationHook() {
    //create ract hook for machine information data
    const [machineInformationData, setMachineInformationData] = useState([
        {textValue: 'New Machine', iconValue: null},
        {textValue: 'No Data Recorder Selected', iconValue: 'Icon_Data_Recorder_IOS_Gray'},
        {textValue: 'No Controller Selected', iconValue: 'Icon_CPU_IOS_Gray'},
        {textValue: 'Ethernet Connection', iconValue: 'Icon_Ethernet_IOS_White'},
        {textValue: 'Not Secured', iconValue: 'Icon_Unlock_IOS_White'}
    ]);

    //function to update machine information data
    function updateMachineInformationData(passedIndexValue: number, passedUpdateValue: any) {
        // Update new state
        const updatedData = [...machineInformationData];
        updatedData[passedIndexValue] = passedUpdateValue;
        setMachineInformationData(updatedData);
    }
    //return created
    return { machineInformationData, updateMachineInformationData }
}