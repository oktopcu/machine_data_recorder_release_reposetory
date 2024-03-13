import React, { ReactNode, useEffect, useState } from "react";

//import css stylesheet
import '../../style/container/app_container_style.css';

//import created react components
import { DefaultImage } from "../atoms/images/images";
import { ImageButton, MenuButton, RoundImageButton } from "../atoms/buttons/buttons";

//import function for menu click action
import { menuItemClickAction } from "../../functions/ui_action/button_click_action";
import FlexBox from "../atoms/other/flexbox";
import FastActionsOptionModal from "../modals/action_modals/fast_actions_option_modal";
import { setConsoleMessage } from "../../functions/tools/messages";

//create and export main page menu
export function MainPageMenu() {
    //define state to add read data to
    const [menuButtonItemData, setMenuButtonItemData] = useState<any[] | null>(null);
    //define state for fast action option modal
    const [fastActionOptionModalVisible, setFastActionOptionModalVisible] = useState<boolean>(false);
    //define react hook for current active menu item
    const [currentActiveMenuItem, setCurrentActiveMenuItem] = useState<string | undefined>(' ');

    //add effect to pass threw items
    useEffect(() => {
        //read json data and set to state hook variable
        fetch('assets/data/page_menu_items.json')
            .then(jsonResponse => jsonResponse.json())
            .then(jsonData => setMenuButtonItemData(jsonData))
            .catch(readJsonFileError => setConsoleMessage(readJsonFileError, true));
    }, []);

    //define function to call with menu button click
    function menuButtonPressed(passedMenuButtonId: string, passedMenuButtonFileUrl: string){
        //set new state 
        setCurrentActiveMenuItem(passedMenuButtonId);
        //call menu item click action function
        menuItemClickAction(passedMenuButtonFileUrl);
    }

    //return created react component
    return (
        <div id="leftSidePageContainer" className="left-side-container-style">
            <DefaultImage imageID="mainPageLogo" style={{height: '9%', width: 'auto', marginLeft: '5%', borderRadius: '0px'}} imageValue='/assets/images/logos/internal/Machine_Data_Recorder_Logo_1_Final.png'/>
            <div id="menuContainer">
                <nav id="mainPageMenu" className="main-page-menu-style">
                    {
                        //check and add all read menu button items to menu component
                        menuButtonItemData && menuButtonItemData.map((currentMenuButtonData) => (
                            //add main menu bar item
                            <MenuButton buttonID={currentMenuButtonData['pageMenuItemID']} buttonHoverText={currentMenuButtonData['pageMenuItemHoverText']} buttonText={currentMenuButtonData['pageMenuItemName']}
                                buttonImage={currentMenuButtonData['pageMenuItemImageFile']} menuButtonActive={currentMenuButtonData['pageMenuItemID'] === currentActiveMenuItem} 
                                buttonAction={() => menuButtonPressed(currentMenuButtonData['pageMenuItemID'], currentMenuButtonData['pageMenuItemFileURL'])}/>
                            
                        ))
                    }
                </nav>
                <p id="bottonMainMenuContainer" className="bottom-main-page-menu-container-style-properties">
                    <FlexBox>
                        <div id="fastActionElementContainer">
                            {
                                //add all fast action elements

                            }
                        </div>
                        <ImageButton buttonID="addNewFastAction" buttonAction={() => setFastActionOptionModalVisible(!fastActionOptionModalVisible)} buttonImage="/assets/images/icons/general/Icon_Plus_IOS_White.png"/>
                    </FlexBox>
                    <FastActionsOptionModal modalActive={fastActionOptionModalVisible}/>
                </p>
            </div>
        </div>
    );
}

//define interface for page header properties
interface PageHeaderProperties {
    pageHeaderComponentId?: string,
    pageHeaderText: string | undefined,
    pageHeaderImage?: string | undefined
}

//create and export page header
export const PageHeader: React.FC<PageHeaderProperties> = (props: PageHeaderProperties) => {
    return (
        <div id={props.pageHeaderComponentId}>
            <FlexBox style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <FlexBox style={{width: '50%', alignItems: 'center'}}>
                    {
                        //check if image can be displayed or not
                        props.pageHeaderImage && <DefaultImage style={{height: '40%', width: 'auto', marginRight: '2.5%'}} imageValue={props.pageHeaderImage}/>
                    }
                    <h1 style={{color: '#509CF5'}}>{props.pageHeaderText}</h1>
                </FlexBox>
                <RoundImageButton buttonID="personalAccountInformation" buttonImage="/assets/images/user_profile_pictures/images_options/Image_Account_01.png"
                    buttonAction={() => menuItemClickAction('account')} buttonHoverText="Check out your personal Account data"/>
            </FlexBox>
        </div>
    );
}

//define interface for button option panel properties
interface ButtonOptionPanelProperties {
    buttonOptionPanelID?: string,
    children?: ReactNode
}

//create and export button option panel
export const ButtonOptionPanel: React.FC<ButtonOptionPanelProperties> = (props: ButtonOptionPanelProperties) => {
    return(
        <div id={props.buttonOptionPanelID} className="button-option-panel-style-properties">
            <FlexBox>{props.children}</FlexBox>
        </div>
    );
}
