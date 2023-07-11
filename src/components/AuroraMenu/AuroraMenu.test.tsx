import React from 'react';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';
import AuroraMenu, { MenuProps } from './AuroraMenu';
import AuroraMenuItem from './AuroraMenuItem';
import '../../../setupTests';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
};
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
};
const generateMenu = (props: MenuProps) => {
  return (
    <AuroraMenu data-testid="test-menu" {...props} defaultIndex={2} mode={'vertical'}>
      <AuroraMenuItem index={1} disabled>
        disabled
      </AuroraMenuItem>
      <AuroraMenuItem index={2}>active</AuroraMenuItem>
      <AuroraMenuItem index={3}>我的</AuroraMenuItem>
    </AuroraMenu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    // 获取相应节点
    wrapper = render(generateMenu(testProps));
    // 利用test-id来获取节点
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('我的');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith(3);
  });
  it('should render vertical mode when mode is set to vertical ', () => {
    // 清除前面创建的wrapper
    cleanup();
    const wrapper = render(generateMenu(testProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical test');
  });
});
