import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AuroraMenu from './AuroraMenu';
import AuroraMenuItem from './AuroraMenuItem';
import AuroraSubMenu, { SubMenuProps } from './AuroraSubMenu';
import './_style.scss';

/**
 * 如何使用AuroraMenu？
 *
 * ~~~js
 * import {AuroraMenu} from 'AuroraUI'
 * ~~~
 */
const meta: Meta = {
  title: 'Menu Component',
  component: AuroraMenu,
  tags: ['autodocs'],
  argTypes: {
    defaultOpenSubMenus: {
      description: '是否默认展开SubMenu，将AuroraSubMenu的index传入数组',
    },
    children: {
      description: '菜单项，可以包含 AuroraMenuItem 和 AuroraSubMenu 组件',
    },
    subcomponents: {
      title: 'Sub Components',
      components: {
        AuroraSubMenu,
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const 竖向Menu: Story = {
  args: {
    mode: 'horizontal',
    children: [
      <AuroraMenuItem>group1</AuroraMenuItem>,
      <AuroraMenuItem>group2</AuroraMenuItem>,
      <AuroraMenuItem>group3</AuroraMenuItem>,
      <AuroraSubMenu title={'group4'}>
        <AuroraMenuItem>group4-1</AuroraMenuItem>
        <AuroraMenuItem>group4-2</AuroraMenuItem>
        <AuroraMenuItem>group4-3</AuroraMenuItem>
      </AuroraSubMenu>,
    ],
    onSelect: action('click'),
  },
};

export const 横向Menu: Story = {
  args: {
    mode: 'vertical',
    children: [
      <AuroraMenuItem>group1</AuroraMenuItem>,
      <AuroraMenuItem>group2</AuroraMenuItem>,
      <AuroraMenuItem>group3</AuroraMenuItem>,
      <AuroraSubMenu title={'group4'}>
        <AuroraMenuItem>group4-1</AuroraMenuItem>
        <AuroraMenuItem>group4-2</AuroraMenuItem>
        <AuroraMenuItem>group4-3</AuroraMenuItem>
      </AuroraSubMenu>,
    ],
    onSelect: action('click'),
  },
};
