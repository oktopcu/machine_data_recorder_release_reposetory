//import react libraries
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

//import machine manager default page css files
import '../../../style/style.css';
import '../../../style/routes/machine_manager_page_style.css';

//import custom react components
import { PageHeader } from "../../container/app_container";

//import machine manger page views
import MachineManagerStartView from "./start_view/start_view";
import MachineManagerOverviewView from "./overview_view/overview_view";

//create and export machine manager default page
export default function MachineManagerDefaultPage() {
    //use custom react hook to set machine manager header text+
    //const { machineManagerHeader } = MachineManagerPageHeaderNameHook();

    //return created machine manager view
    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="machineManagerPageHeader" pageHeaderText="Machine Manager" pageHeaderImage="/assets/images/icons/general/Icon_Machine_IOS_ONE_Blue.png"/>
            <MachineManagerCustomRoutes />
        </div>
    );
}

//create router for machine manager pages              
function MachineManagerCustomRoutes() {
    //get the current url value
    const currentMachineManagerUrlValue = useLocation();

    //search for machine manager page view value
    const pageViewValue = 
        new URLSearchParams(currentMachineManagerUrlValue.search).get('machineManagerView');

    //check if machine manager page is opened
    if(currentMachineManagerUrlValue.pathname.includes('machineManager')) {
        //check which view to set
        switch(pageViewValue){
            case 'machineOverview':
                //return overview machine manager view
                return <MachineManagerOverviewView/>
            default:
                //return start machine maynger view
                return <MachineManagerStartView/>
        }
    }
    //return null case value
    return <MachineManagerStartView/>;
}
