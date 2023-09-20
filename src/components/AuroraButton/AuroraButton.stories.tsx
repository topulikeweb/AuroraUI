import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/addon-docs';
import AuroraButton from './AuroraButton';

/**
 * 如何使用AuroraButton
 *
 * ~~~js
 * import {AuroraButton} from 'aurora-topu'
 * ~~~
 */
const meta = {
  title: 'Button Component',
  component: AuroraButton,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '按钮文字',
    },
    onClick: {
      description: '点击触发的函数',
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {},
    },
  },
} satisfies Meta<typeof AuroraButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 默认的Button: Story = {
  args: {
    children: 'default button',
    onClick: action('click'),
  },
};

export const 大号的Button: Story = {
  args: {
    children: 'large button',
    size: 'lg',
  },
};

export const 小号的Button: Story = {
  args: {
    children: 'small button',
    size: 'sm',
  },
};

export const danger类型的Button: Story = {
  args: {
    btnType: 'danger',
    children: 'danger button',
  },
};

export const primary类型的Button: Story = {
  args: {
    btnType: 'primary',
    children: 'primary button',
  },
};
export const link类型的Button: Story = {
  args: {
    href: 'https://github.com/topulikeweb',
    btnType: 'link',
    children: 'link button',
  },
};
