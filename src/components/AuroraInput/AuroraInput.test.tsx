import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '../../../setupTests';
import { AuroraInput, InputProps } from './AuroraInput';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};
describe('test Input component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<AuroraInput {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('viking-input-inner');
    fireEvent.change(testNode, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('23');
  });
  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<AuroraInput disabled placeholder={'disabled'}></AuroraInput>);
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it('should render different input sizes on size property', () => {
    const wrapper = render(<AuroraInput placeholder="sizes" size="lg"></AuroraInput>);
    const testContainer = wrapper.container.querySelector('.viking-input-wrapper');
    expect(testContainer).toHaveClass('input-size-lg');
  });
  it('should render perpend and append element on perpend/append', () => {
    const { queryByText, container } = render(
      <AuroraInput placeholder="pend" prepend="https://" append=".com"></AuroraInput>
    );
    const testContainer = container.querySelector('.viking-input-wrapper');
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    expect(queryByText('https://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
});
