//import storybook options
import { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./text_input";

//import created text input components

//define default text input storybook component
const defaultTextInput = {
    title: 'default_text_input_component',
    component: TextInput,
    parameters: {

    },
    tags: ['autodocs']
} satisfies Meta<typeof TextInput>;

//export default text input component
export default defaultTextInput;

//define abstract option to created more text elements based on the default component
type Story = StoryObj<typeof defaultTextInput>