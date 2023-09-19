import { Meta, StoryObj } from '@storybook/react';
import Welcome from './Welcome';

const meta: Meta = {
  title: 'welcome page',
  component: Welcome,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export default meta;

export const 欢迎: Story = {
  args: {},
};
