import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AuroraUpload from './AuroraUpload';
import './_style.scss';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Upload Component',
  component: AuroraUpload,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const 上传文件: Story = {
  args: {
    accept: 'jpg',
    multiple: true,
    drag: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    children: '上传文件',
    onChange: action('changed'),
    onRemove: action('removed'),
    name: 'fileName',
  },
};
