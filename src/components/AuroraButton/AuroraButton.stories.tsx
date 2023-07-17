import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AuroraButton from './AuroraButton';

const meta = {
  title: 'Button Component',
  component: AuroraButton,
  tags: ['autodocs'],
} satisfies Meta<typeof AuroraButton>;

export default meta;
type Story = StoryObj<typeof meta>;
// const styles: React.CSSProperties = {
//   textAlign: 'center',
// };
//
// // const CenterDecorator: Story = (storyFn: any) => <div style={styles}>{storyFn()}</div>;
export const 默认的Button: Story = {
  render: () => {
    return <AuroraButton onClick={action('clicked')}>default button</AuroraButton>;
  },
};

export const 不同尺寸的Button: Story = {
  render: () => (
    <>
      {/*大号Button*/}
      <AuroraButton size={'lg'}>primary button</AuroraButton>
      {/*正常Button*/}
      <AuroraButton>danger button</AuroraButton>
      {/*小号Button*/}
      <AuroraButton size={'sm'}>danger button</AuroraButton>
    </>
  ),
};

export const 不同类型的Button: Story = {
  render: () => (
    <>
      {/*primary类型*/}
      <AuroraButton btnType={'primary'}>primary button</AuroraButton>
      {/*danger类型*/}
      <AuroraButton btnType={'danger'}>danger button</AuroraButton>
      {/*link类型*/}
      <AuroraButton btnType={'link'} href="https://google.com">
        link button
      </AuroraButton>
    </>
  ),
};
