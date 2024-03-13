import React from "react";

//import account page css file
import '../../../style/style.css';
import '../../../style/routes/account_page_style.css';

//import created react components
import { PageHeader } from "../../container/app_container"; 


//create and export default account page view
export default function AccountPage(){
    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="accountPageHeader" pageHeaderText="Account" pageHeaderImage="/assets/images/icons/general/Icon_Account_IOS_ONE_Blue.png"/>

        </div> 
    );
}