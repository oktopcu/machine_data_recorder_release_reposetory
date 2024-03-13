import React from "react";

//import home page css file
import '../../../style/style.css';
import '../../../style/routes/help_center_page_style.css';

//import created react components
import { PageHeader } from "../../container/app_container";

//create and export default help center page view
export default function HelpCenterPage(){
    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="helpCenterPageHeader" pageHeaderText="Help Center" pageHeaderImage="/assets/images/icons/general/Icon_Help_IOS_ONE_Blue.png"/>

        </div> 
    );
}