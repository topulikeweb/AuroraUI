import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AuroraButton from './AuroraButton';
import { Story, Canvas, ArgsTable } from '@storybook/addon-docs';

const meta = {
  title: 'Button Component',
  component: AuroraButton,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Button component for your UI.',
      },
    },
  },
} satisfies Meta<typeof AuroraButton>;

export default meta;
type Story = StoryObj<typeof meta>;
// const styles: React.CSSProperties = {
//   textAlign: 'center',
// };
//
// // const CenterDecorator: Story = (storyFn: any) => <div style={styles}>{storyFn()}</div>;
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
