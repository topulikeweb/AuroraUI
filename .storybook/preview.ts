/**
 * @typedef {import('@storybook/react').Preview} Preview
 */

/**
 * The preview configuration object.
 * @type {Preview}
 */
const preview = {
  parameters: {
    /**
     * Configure actions addon.
     * @type {Object}
     */
    actions: { argTypesRegex: '^on[A-Z].*' },

    /**
     * Configure controls addon.
     * @type {Object}
     */
    controls: {
      matchers: {
        /**
         * Matcher for color controls.
         * @type {RegExp}
         */
        color: /(background|color)$/i,

        /**
         * Matcher for date controls.
         * @type {RegExp}
         */
        date: /Date$/,
      },
    },
  },
};

export default preview;
