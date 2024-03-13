//import storybook options
import { Meta, StoryObj } from "@storybook/react";

//import created image components
import { DefaultImage } from "./images";

//define default image text storybook component
const defaultImage = {
    title: 'default_image_component',
    component: DefaultImage,
    parameters: {

    },
    tags: ['autodocs']
} satisfies Meta<typeof DefaultImage>;

//export default image component
export default defaultImage;

//define abstract option to created more image elements based on the default component
type Story = StoryObj<typeof defaultImage>;
