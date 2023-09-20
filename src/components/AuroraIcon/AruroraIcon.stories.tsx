import {Meta, StoryObj} from "@storybook/react";
import {AuroraIcon} from "../../index";

/**
 * ~~~js
 * import {AuroraIcon} from 'aurora-topu'
 * ~~~
 *
 */
const meta: Meta = {
  title: 'Icon Component',
  component: AuroraIcon,
  tags: ['autodocs'],
};
type Story = StoryObj<typeof meta>;
export default meta;

export const 基本的使用: Story = {
  args: {
    icon: 'coffee'
  },
};


export const 改变大小: Story = {
  args: {
    icon: 'coffee',
    size: 'lg'
  },
};

export const 改变主题: Story = {
  args: {
    icon: 'coffee',
    size: 'lg',
    theme: 'success'
  },
};
