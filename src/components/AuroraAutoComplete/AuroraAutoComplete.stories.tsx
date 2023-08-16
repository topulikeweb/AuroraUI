import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AuroraAutoComplete } from './AuroraAutoComplete';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'AutoComplete Component',
  component: AuroraAutoComplete,
  tags: ['autodocs'],
};
type Story = StoryObj<typeof meta>;

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items.slice(0, 10).map((item: any) => ({
        value: item.login,
        ...item,
      }));
    });
};

export const 自定义搜索结果模板: Story = {
  args: {
    placeholder: '请输入想查询的github用户的用户名',
    fetchSuggestions: handleFetch,
    onSelect: action('selected'),
  },
};
export default meta;
