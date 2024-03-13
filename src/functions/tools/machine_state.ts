//define interface for machine state image function 
interface MachineStateImageFunctionProperties {
    passedMachineStateValue: number
}

//create and export machine state image function
export function machineStateImage({passedMachineStateValue = 0}: MachineStateImageFunctionProperties): string {
    //Define image options for different machine state
    const machineStateImageOptions: string[] = 
        ["Icon_Machine_Inactive_IOS_White", "Icon_Machine_Active_IOS_Green", "Icon_Machine_Warning_IOS_Yellow", "Icon_Machine_Error_IOS_Red"];

    //try to set machine state image
    try 
    {
        //return machine state image
        return `/assets/images/icons/machine_states/${machineStateImageOptions[passedMachineStateValue]}.png`;    
    } 
    catch (setMachineStateImageError) {
        //set error message
        console.error(`set_machine_state_image_error: ${setMachineStateImageError}`);
        return "";
    }
}