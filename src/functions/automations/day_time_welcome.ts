import { useState } from "react";

//import external created functions
import { AutoRefresh } from "./auto_refresh";

//define and export function to set day time welcome
export default function DayTimeWelcome(dayTimeWelcomeActive: boolean, passedUserName: string, timeRefreshValue: number = 60000) {
    //try to set day time welcome text
    try 
    {
        //define current time text value
        const [currentDayTimeText, setCurrentDayTimeText] = useState<any>([]);

        //check if day time welcome is turned off
        if(!dayTimeWelcomeActive){
            //return default text value/ function -> not active
            return [`Welcome back, ${passedUserName}`, '/assets/images/icons/general/Icon_Home_IOS_ONE_Blue.png'];
        }

        //define inner function to set day time welcome message
        const setDayTimeWelcomeTextMessage = () => {
            //get current time value
            let currentTimeValue = new Date().getHours();

            //set day time text matching to the time
            if(currentTimeValue >= 6 && currentTimeValue < 12) {
                //set good morning text
                setCurrentDayTimeText([`Good Morning, ${passedUserName}`, '/assets/images/icons/daytime_icon/Icon_Morning_IOS_ONE_Blue.png']);
            }
            else if(currentTimeValue >= 12 && currentTimeValue < 18) {
                //set good afternoon text
                setCurrentDayTimeText([`Good Afternoon, ${passedUserName}`, '/assets/images/icons/daytime_icon/Icon_Day_IOS_ONE_Blue.png']);
            }
            else if(currentTimeValue >= 18 && currentTimeValue < 24) {
                //set good evening text
                setCurrentDayTimeText([`Good Evening, ${passedUserName}`, '/assets/images/icons/daytime_icon/Icon_Day_IOS_ONE_Blue.png']);
            }
            else {
                //set good night text
                setCurrentDayTimeText([`Good Night, ${passedUserName}`, '/assets/images/icons/daytime_icon/Icon_Night_IOS_ONE_Blue.png']);
            }
        }
        //call auto refresh function to set day time text value
        AutoRefresh(timeRefreshValue, setDayTimeWelcomeTextMessage);

        //return string text value
        return currentDayTimeText;
    }
    catch(setDayTimeWelcomeError){
        //set error message to console
        console.error(`set_day_time_error_message: ${setDayTimeWelcomeError}`);
        return [`Welcome back, ${passedUserName}`, '/assets/images/icons/general/Icon_Home_IOS_ONE_Blue.png'];
    }
}