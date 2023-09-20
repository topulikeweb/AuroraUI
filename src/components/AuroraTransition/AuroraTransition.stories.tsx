import {Meta, StoryObj} from "@storybook/react";
import AuroraTransition from "./AuroraTransition";
import AuroraButton from "../AuroraButton/AuroraButton";


/**
 * ~~~js
 * import {AuroraTransition} from 'aurora-topu'
 * ~~~
 *
 */
// const [show, setShow] = React.useState(false);
const meta: Meta = {
  title: 'Transition Component',
  component: AuroraTransition,
  tags: ['autodocs'],
};
type Story = StoryObj<typeof meta>;
export default meta;

export const 基本的使用: Story = {
  args: {
    wrapper: true,
    // in: show,
    timeout: 300,
    animation: 'zoom-in-left',
    children: (
        <AuroraButton>点击</AuroraButton>
    )
  },
};
