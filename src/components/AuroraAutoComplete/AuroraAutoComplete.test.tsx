import React from 'react';
import { config } from 'react-transition-group';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { AuroraAutoComplete, autoCompleteProps } from './AuroraAutoComplete';
import { wait } from '@testing-library/user-event/dist/utils';
import './_style.scss';
config.disabled = true;

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
];
const testProps: autoCompleteProps = {
  fetchSuggestions: (query: string) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AuroraAutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  });
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'ab' } });

    // Use findByText to wait for the element to appear
    const abElement = await wrapper.findByText('ab');
    expect(abElement).toBeTruthy();

    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2);

    // click the first item
    fireEvent.click(wrapper.getByText('ab'));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

    // Use queryByText to check if the element is not in the document
    expect(wrapper.queryByText('ab')).toBeNull();

    //fill the input
    expect(inputNode.value).toBe('ab');
  });

  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await wait(1000);
    await expect(wrapper.queryByText('ab')).toBeTruthy();
    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass('is-active');
    //arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass('is-active');
    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass('is-active');
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } });
    await expect(wrapper.queryByText('ab')).toBeInTheDocument();
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it('renderOption should generate the right template', () => {});
  it('async fetchSuggestions should works fine', () => {});
});
