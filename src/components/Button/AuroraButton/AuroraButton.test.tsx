import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AuroraButton, { ButtonProps, ButtonSize, ButtonType } from './AuroraButton';
import '../../../../setupTests';

const defaultProps = {
  onClick: jest.fn(),
};
const testType: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'testClass',
};

const testLink: ButtonProps = {
  btnType: ButtonType.Link,
  className: 'testLinkClass',
  size: ButtonSize.Small,
};

const disabledProps: ButtonProps = {
  disabled: true,
  className: 'disabledClass',
  onClick: jest.fn(),
};
describe('test AuroraButton component', () => {
  // 测试default button
  it('should render the correct default button', function () {
    const wrapper = render(<AuroraButton {...defaultProps}>Nice</AuroraButton>);
    // 获取所有文本为Nice的元素
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    // 检测是否正确渲染到document上
    expect(element).toBeInTheDocument();
    // AuroraButton 最终还是会渲染成button组件
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).not.toBeTruthy();
    expect(element).toHaveClass('btn btn-default');
    // 测试组件是否正常触发点击事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', function () {
    const wrapper = render(<AuroraButton {...testType}>Nice</AuroraButton>);
    // 获取所有文本为Nice的元素
    const element = wrapper.getByText('Nice');
    // 检测是否正确渲染到document上
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-lg btn-primary testClass');
  });
  it('should render a link when btnType equals link and href is provided ', function () {
    const wrapper = render(<AuroraButton {...testLink}>Nice</AuroraButton>);
    // 获取所有文本为Nice的元素
    const element = wrapper.getByText('Nice');
    // 检测是否正确渲染到document上
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-sm btn-link testLinkClass');
  });
  it('should render the correct component based on disabled ', function () {
    const wrapper = render(<AuroraButton {...disabledProps}>Nice</AuroraButton>);
    // 获取所有文本为Nice的元素
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    // 检测是否正确渲染到document上
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn disabledClass btn-default');
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
