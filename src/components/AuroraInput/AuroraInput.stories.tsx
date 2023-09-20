import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AuroraInput from './AuroraInput';

/**
 * 如何使用AuroraInput?
 *
 * ~~~js
 * import {AuroraInput} from 'aurora-topu'
 * ~~~
 *
 * 基本是支持所有的 HTMLInput 的所有属性
 */
const meta: Meta = {
  title: 'Input Component',
  component: AuroraInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const 默认的Input: Story = {
  args: {
    placeholder: '默认的Input',
  },
};

export const 被禁用的Input: Story = {
  args: {
    disabled: true,
    placeholder: '被禁用的Input',
  },
};

export const 带图标的Input: Story = {
  args: {
    icon: 'magnifying-glass',
    placeholder: '带图标的Input',
  },
};

export const 带前缀的Input: Story = {
  args: {
    prepend: 'http://',
  },
};

export const 带后缀的Input: Story = {
  args: {
    append: '.com',
  },
};
