import { useEffect } from "react";

//create and export function to auto refresh functions
export function AutoRefresh(passedRefreshIntervalTime: number = 60000, passedAutoRefreshFunction: any){
    //try to auto refresh passed function
    try
    {
        useEffect(() => {
            //make initial function call
            passedAutoRefreshFunction();

            //set intervall for function
            const refreshFunctionInterval = setInterval(() => {
                //call passed function to auto refresh
                passedAutoRefreshFunction();
            }, passedRefreshIntervalTime);

            //cleanup interval of refreshing
            return () => clearInterval(refreshFunctionInterval);
        }, [passedAutoRefreshFunction, passedRefreshIntervalTime]);
    }
    catch(autoRefreshError)
    {
        //set error message to console
        console.error(`auto_refresh_error_message: ${autoRefreshError}`);
    }
}