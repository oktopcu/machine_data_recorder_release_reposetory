import { useNavigate, useLocation } from 'react-router-dom';

//create and export menu item click function
export function menuItemClickAction(passedUrlSiteValue: string = "/") {
    //define page item map with page properties
    const pageViewMap = new Map([
        [" ", "Home"],
        ["machineManager", "Machine Manager"],
        ["generalSettings", "General Settings"],
        ["helpCenter", "Help Center"],
        ["shop", "Shop"],
        ["account", "Account"]
    ]);

    //try to change the page url
    try 
    {
        //check if clicked page is allready visible
        if(!window.location.href.includes(passedUrlSiteValue)){
            //navigate to passed route
            window.location.href = `./${passedUrlSiteValue}`;
            //set new tab title
            document.title = `Machine Date Recorder | ${pageViewMap.get(passedUrlSiteValue)}`;
        }
    } 
    catch (changeSiteUrlError) 
    {
        //set error message to console
        console.error(`change_site_url_error: ${changeSiteUrlError}`);
    }
}
