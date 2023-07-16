import type { Preview } from '@storybook/react';
import React from 'react';

const styles: React.CSSProperties = {
  textAlign: 'center',
};
const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={styles}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
