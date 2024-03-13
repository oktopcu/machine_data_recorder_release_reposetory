import React from "react";

//import home page css file
import '../../../style/style.css';
import '../../../style/routes/general_settings_page_style.css';

//import created react components
import { PageHeader } from "../../container/app_container";

//create and export default home page view
export default function GeneralSettingsPage(){
    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="generalSettingsPageHeader" pageHeaderText="Settings" pageHeaderImage="/assets/images/icons/general/Icon_Settings_IOS_ONE_Blue.png"/>

        </div> 
    );
}