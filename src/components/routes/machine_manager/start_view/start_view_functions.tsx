//import react library
import React from "react";

//import ts function
import { setConsoleMessage } from "../../../../functions/tools/messages"

//create and export function to navigate machine manager pages
export function navigateMachineManager(internalMachineManaherPageUrl: string = 'start'): number {
    //try to navigate machine manager pages
    try 
    {
        

    } 
    catch (navigateMachineManagerError: any) 
    {
        //set error message
        setConsoleMessage(navigateMachineManagerError, true);
    }
    //return current machine manager view value
    return 1;
}

//create and export function to connect to machine
export function openMachinePath() {
    //try to open clicked machine
    try 
    {
        //get current url value
        const currentUrlValue = window.location.href;
        //set new file path
        window.location.href = `${currentUrlValue}?machineManagerView=machineOverview`;
    } 
    catch (openMachineError: any) 
    {
        //call function to set error message
        setConsoleMessage(openMachineError, true);
    }
    //return null value
    return null;
}