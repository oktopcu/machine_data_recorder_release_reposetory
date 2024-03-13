//create a machine data object
export class MachineData {
    //define variables 
    private machineDescription: string;
    private machineName: string;
    private machineID: string;
    private machinePasswordSet: boolean;
    private machinePassword: string;
    private companyID: string;
    private machineAddedDate: Date;

    //constructor to pass variables to
    constructor(machineDescription: string, machineName: string, machineID: string, machinePasswordSet: boolean, machinePassword: string, companyID: string, machineAddedDate: Date){
        this.machineDescription = machineDescription;
        this.machineName = machineName;
        this.machineID = machineID;
        this.machinePasswordSet = machinePasswordSet;
        this.machinePassword = machinePassword;
        this.companyID = companyID;
        this.machineAddedDate = machineAddedDate;
    }

    


}