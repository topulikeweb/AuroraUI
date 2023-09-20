import {Meta, StoryObj} from '@storybook/react';
import AuroraProgress from './AuroraProgress';

/**
 * ~~~js
 * import {AuroraProgress} from 'aurora-topu'
 * ~~~
 *
 */
const meta: Meta = {
  title: 'Progress Component',
  component: AuroraProgress,
  tags: ['autodocs'],
};
type Story = StoryObj<typeof meta>;
export default meta;

export const 基本的使用: Story = {
  args: {
    strokeHeight: 15,
    showText: true,
    theme: 'primary',
    percent: 20,
  },
};

export const 换一种样式: Story = {
  args: {
    strokeHeight: 15,
    showText: true,
    theme: 'danger',
    percent: 20,
  },
};
/**
 * 如何超过100或者低于0？
 */
export const 如何突破限制: Story = {
  args: {
    strokeHeight: 15,
    showText: true,
    theme: 'danger',
    percent: 120,
    restrict: false,
  },
};
