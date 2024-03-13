import React from "react";

//import home page css file
import '../../../style/style.css';
import '../../../style/routes/shop_page_style.css';

//import created react components
import { PageHeader } from "../../container/app_container";

//create and export default shop page view
export default function ShopPage(){
    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="shopPageHeader" pageHeaderText="Shop" pageHeaderImage="/assets/images/icons/general/Icon_Shop_IOS_ONE_Blue.png"/>

        </div>
    );
}