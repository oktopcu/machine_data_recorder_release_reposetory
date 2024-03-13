import { useEffect, useState } from "react";

//create and export function to access current company account 
export async function GetCurrentCompanyAccount(passedCurrentLoggedInAccount: Text){
    //define varibale where to set data
    const [endpointData, setEndpointData] = useState([]);

    //get data with request
    useEffect(() => {
        const fetchEndpointData = async () => {
            try
            {
                //define and get data from endpoint
                const endpointResponse = await fetch('../companyAccount');
                const endpointData = await endpointResponse.json();
                setEndpointData(endpointData);
            }
            catch(getCompanyAccountEndpointDataError){
                //call method to set error message
                
            }
        }
    }, []);

    //return final found account
    return ;
}