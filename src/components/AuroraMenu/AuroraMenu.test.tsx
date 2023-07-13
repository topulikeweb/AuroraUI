import React from 'react';
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react';
import AuroraMenu, { MenuContext, MenuProps } from './AuroraMenu';
import AuroraMenuItem from './AuroraMenuItem';
import '../../../setupTests';
import AuroraSubMenu from './AuroraSubMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};
const generateMenu = (props: MenuProps) => {
  return (
    <AuroraMenu
      data-testid="test-menu"
      {...props}
      defaultIndex={'1'}
      mode={'vertical'}
      defaultOpenSubMenus={['3']}
    >
      <AuroraMenuItem disabled>disabled</AuroraMenuItem>
      <AuroraMenuItem>active</AuroraMenuItem>
      <AuroraMenuItem>我的</AuroraMenuItem>
      <AuroraSubMenu title={'dropDown'}>
        <AuroraMenuItem>drop1</AuroraMenuItem>
      </AuroraSubMenu>
      <AuroraSubMenu title={'open'}>
        <AuroraMenuItem>open1</AuroraMenuItem>
      </AuroraSubMenu>
    </AuroraMenu>
  );
};
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement,
  vWrapper: RenderResult;

// 测试css样式是否是正确的
const createStyleFile = () => {
  const cssFile = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    // 获取相应节点
    wrapper = render(generateMenu(testProps));
    // 利用test-id来获取节点
    menuElement = wrapper.getByTestId('test-menu');
    // 将css文件插入到wrapper测试组件中
    wrapper.container.append(createStyleFile());
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('viking-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('我的');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    // 是否是用了正确的参数
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
  });
  it('should render vertical mode when mode is set to vertical ', () => {
    // 清除前面创建的wrapper
    cleanup();
    const wrapper = render(generateMenu(testProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-horizontal test');
  });
  it('should show dropdown items when hover on subMenu ', async () => {
    // 来测试drop1元素是否不可见
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropDownElement = wrapper.getByText('dropDown');
    fireEvent.mouseEnter(dropDownElement);
    // 因为有300秒的延迟效果存在，所以要进行异步操作
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropDownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});
/**
 * @author topu
 * @date 2023/7/12
 * @Description 测试vertical模式下menu
 * @param {type} [param] 参数说明
 * @return 返回值
 */
describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    vWrapper = render(generateMenu(testVerProps));
    vWrapper.container.append(createStyleFile());
  });
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = vWrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
  it('should show dropdown items when click on subMenu for vertical mode ', () => {
    const dropDownItem = vWrapper.queryByText('drop1');
    expect(dropDownItem).toBeVisible();
    fireEvent.click(vWrapper.getByText('dropDown'));
    expect(dropDownItem).not.toBeVisible();
  });
});
