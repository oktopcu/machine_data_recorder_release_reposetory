import React from "react";

//import home page css file
import '../../../style/style.css';
import '../../../style/routes/home_page_style.css';

//import created react components
import { PageHeader } from "../../container/app_container"; 
import FlexBox from "../../atoms/other/flexbox";

//testing
import { InformationCard } from "../../atoms/other/component_boxes";
import { DefaultImage } from "../../atoms/images/images";
import { DefaultLink } from "../../atoms/texts/texts";

//import created functions
import DayTimeWelcome from "../../../functions/automations/day_time_welcome";
import { ImageButton } from "../../atoms/buttons/buttons";

//create and export default home page view
export default function MainPage(){
    //call function to get daytime welcome message
    const dayTimeWelcomeMessage = DayTimeWelcome(true, "Kai", 60000);

    return (
        <div className="default-route-page-style">
            <PageHeader pageHeaderComponentId="mainPageHeader" pageHeaderText={dayTimeWelcomeMessage[0]} pageHeaderImage={dayTimeWelcomeMessage[1]}/>
            <FlexBox>
                <div id="leftSideMainPageContainer" className="">
                    <ImageButton buttonID="" buttonImage="/assets/images/icons/general/Icon_Logout_IOS_ONE_Blue.png" buttonHoverText=""/>
                
                </div>
                <div id="rightSideMainPageContainer" className="">

                </div>
            </FlexBox>
        </div> 
    );
}