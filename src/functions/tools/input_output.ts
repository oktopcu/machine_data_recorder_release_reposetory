//create function to open file chooser dialog (import)
export function fileChooserDialogImport(passedAcceptFileType?: string): Promise<File | null> {
    //return new promise value
    return new Promise((resolvePromise) => {
        //define input components
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = passedAcceptFileType as string;

        //set change event to get file path
        inputElement.onchange = function(selectElementEvent) {
            //set selected path to variable
            const target = selectElementEvent.target as HTMLInputElement;
            const selectedFile = target?.files?.[0] || null;
            resolvePromise(selectedFile);
        };

        //trigger event to open dialog
        inputElement.click();
    });
}

//create function to open file chooser dialog (export)
export function fileChooserDialogExport(passedDataValue?: File | null | any): string | URL | undefined {
    //define variable to set file location path to
    let fileLocationPath: string | URL | undefined = '';

    //define input components
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.click();

    //set change event to get file path


    //return file location path
    return fileLocationPath;
}