//create and export function to set messages to console
export const setConsoleMessage = (passedMessage: string, errorMessage: boolean = false, expandedDataMessage: boolean = false): void => {
    //check if expanded data text has to be created
    let expandedDataText: string = "";
    if(expandedDataMessage){
        //created expanded data message
        expandedDataText = `- Date_Information: ${(new Date()).toString()}\n- Text_Character_Lenght: ${passedMessage.toString().length}\n- Error_Message: ${errorMessage.toString()}`;
    }

    //check which console log to set (default/ error)
    (!errorMessage) ? console.log(`${passedMessage}\n${expandedDataMessage}`): console.error(`${passedMessage}\n${expandedDataText}`);    
}