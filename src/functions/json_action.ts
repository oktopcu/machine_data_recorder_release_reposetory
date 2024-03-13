//import custom ts function
import { setConsoleMessage } from "./tools/messages";

//create and export function to read json files
export async function readJsonFile(jsonFilePath: string): Promise<any> {
    //use fetch api to read json file
    const jsonResponse = await fetch(jsonFilePath);
    const jsonData = await jsonResponse.json();
    return jsonData;
}