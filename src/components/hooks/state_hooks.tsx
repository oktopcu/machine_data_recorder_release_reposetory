import { useState } from "react";

//define types for custom hook component
export type OverviewManagerProps = {
    overviewViewState: string;
    updateOverViewState: (value: string) => void;
};

//create custom react hook to set overview view state
export function OverviewManagerViewHook() {
    //define state hook
    const [overviewViewState, setOverviewViewState] = useState<string>('mmOverviewView');

    //function to update custo react hook
    function updateOverViewState(passedManagerView: string) {
        //set new value to react state hook
        setOverviewViewState(passedManagerView);
    }
    //return custom hook properties
    return { overviewViewState, updateOverViewState }
}

//define types for machine creator page view states
export type MachineCreatorStateProps = {
    machineCreatorNavigation: string;
    updateMachinCreatorNavigation: (value: string) => void;
}

//create custom react hook to navigate creator views
export function MachineCreatorNavigationHook() {
    //define react hook for machine navigation
    const [machineCreatorNavigation, setMachineCreatorNavigation] = useState<string>('mcsbStart');

    //function to set new value to hook
    function updateMachinCreatorNavigation(passedNavigationValue: string) {
        //set new passed value
        setMachineCreatorNavigation(passedNavigationValue);
    }

    //return machine navigation custom hook 
    return { machineCreatorNavigation, updateMachinCreatorNavigation }
}

//define type for close machine creator state hook
export type CloseMachineCreatorModalHookProps = {
    closeMachineCreatorModalState?: boolean | undefined,
    updateMachineCreatorModalState: (value?: boolean | undefined) => void
}

//create custom react hook to close machine creator modal
export function CloseMachineCreatorModalHook(passedModalState?: boolean | undefined) {
    //create hook to for machine creator modal 
    const [closeMachineCreatorModalState, setCloseMachineCreatorModalState] = useState<boolean | undefined>(passedModalState);

    //function to update state hook value
    function updateMachineCreatorModalState(passedModalState?: boolean | undefined){
        //set new value to machine creator modal
        setCloseMachineCreatorModalState(passedModalState);
    }

    //return states of new custom hook
    return { closeMachineCreatorModalState, updateMachineCreatorModalState }
}


//define type for bottom control bar visiblity state hook
export type BottomControlBarVisibilityStateHookProps = {
    bottomControlBarState?: boolean | undefined,
    updateBottomControlBarVisibility: (value?: boolean | undefined) => void
}

//create and export custom react hook to set botto control bar visibility state 
export function BottomControlBarVisibilityStateHook() {
    //define hook to set control bar visiblity state hook
    const [bottomControlBarState, setBottomControlBarState] = useState<boolean | undefined>(false);

    //function to update custom react hook value
    function updateBottomControlBarVisibility(passedControlBarVisibilityState?: boolean | undefined) {
        //set new state of visiblity
        setBottomControlBarState(passedControlBarVisibilityState);
    }

    //return states of new custom hook
    return { bottomControlBarState, updateBottomControlBarVisibility }
}
