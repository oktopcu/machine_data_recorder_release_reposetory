//import storybook options
import { Meta, StoryObj } from "@storybook/react";

//import created button components
import { DefaultButton, ImageButton, RoundImageButton, ImageTextButton, MenuButton } from "./buttons";

//define default button storybook component
const defaultButton = {
    title: 'default_button_component',
    component: DefaultButton,
    parameters: {
        
    },
    tags: ['autodocs']
} satisfies Meta<typeof DefaultButton>;

//export default button component
export default defaultButton;

//define abstract option to created more button elements based on the default component
type Story = StoryObj<typeof defaultButton>;

