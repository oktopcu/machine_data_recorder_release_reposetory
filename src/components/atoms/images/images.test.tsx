import React from "react";
import { render, screen } from "@testing-library/react";

//import created react image components
import { DefaultImage } from "./images";

//create test to check image functionality
test('test_to_check_image_functionality', () => {
    //define static variables
    const EMPTY_IMAGE_FILE = "",
        IMAGE_FILE = "";

    //create test case for rendering image component
    it('test_render_default_image_component', () => {
        render(<DefaultImage imageValue={EMPTY_IMAGE_FILE}/>);
        expect(<DefaultImage imageValue={EMPTY_IMAGE_FILE}/>).toBeInTheDocument();
    });

    //create test case to change image in component
    it('test_to_change_image_file_in_component', () => {
        render(<DefaultImage imageValue={EMPTY_IMAGE_FILE}/>);
        //set new image to component
        expect(<DefaultImage imageValue={IMAGE_FILE}/>).toEqual(IMAGE_FILE);
    });
});