//import typescript function files
import './messages';
import { setConsoleMessage } from './messages';

//create and export function to create correct date format for passed date value
export function dateFormat(passedDate: Date): string{
    //try to set correct date format
    try 
    {
        //define date format
        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        //create formatted date
        const formattedDate = new Intl.DateTimeFormat(undefined, dateOptions).format();
        //return formatted value
        return formattedDate;
    } 
    catch (setDateFormatError: any) 
    {
        //set error message
        setConsoleMessage(setDateFormatError, true);
        return 'set_date_format_error'
    }
}

//create and export function to create correct time format for passed time value
export function timeFormat(passedTime: Date): string {
    //try to set correct time format
    try 
    {
        //define clock time values
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: undefined,
        }

        //create formatted time format
        const formattedTime = new Intl.DateTimeFormat(undefined, timeOptions).format(passedTime);
        //return formatted time
        return formattedTime;
    } 
    catch (setTimeFormatError: any) 
    {
        //set error message
        setConsoleMessage(setTimeFormatError.toString(), true);
        return 'set_time_format_error';
    }
}