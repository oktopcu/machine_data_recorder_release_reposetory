//create and export password generator function
export function passwordGenerator(passwordLength: number = 20, includeNumbers: boolean = true, includeSpecialChars: boolean = true): string {
    //define characters to use in password generator
    const lowercaseChars = 'abcdefghijklmnopqrstuvwzyx';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    //define differnt types of password creation
    let charset = lowercaseChars + uppercaseChars;

    //check casesto set characters
    if (includeNumbers) charset += numberChars;
    if (includeSpecialChars) charset += specialChars;

    //create password with chars and set properties
    let createdPassword = '';
    for(let currentPasswordLenghtValue = 0; currentPasswordLenghtValue < passwordLength; currentPasswordLenghtValue++){
        //create random number for index
        const randomIndex = Math.floor(Math.random() * charset.length);
        //add new character to password string
        createdPassword += charset[randomIndex]
    }   
    //return created password string 
    return createdPassword;
}