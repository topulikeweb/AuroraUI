import React from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import './_style.scss';
import AuroraButton from './AuroraButton';

export default {
  title: 'Button Component',
  component: AuroraButton,
} as Meta;

const styles: React.CSSProperties = {
  textAlign: 'center',
};

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;
const 默认Button = () => <AuroraButton onClick={action('clicked')}>default button</AuroraButton>;
const 不同尺寸的Button = () => (
  <>
    <AuroraButton size={'lg'}>large button</AuroraButton>
    <AuroraButton size={'sm'}>small button</AuroraButton>
  </>
);

const 不同类型的Button = () => (
  <>
    <AuroraButton btnType={'primary'}>primary button</AuroraButton>
    <AuroraButton btnType={'danger'}>danger button</AuroraButton>
    <AuroraButton btnType={'link'} href="https://google.com">
      link button
    </AuroraButton>
  </>
);

export { 默认Button, 不同尺寸的Button, 不同类型的Button };
