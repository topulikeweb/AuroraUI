import React, { ReactNode, createContext, useState } from 'react';
import { memo } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './AuroraMenuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultIndex?: string;
  children?: ReactNode;
  defaultOpenSubMenus?: string[];
}

export interface IMenuProps {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuProps>({ index: '0' });
const AuroraMenu: React.FC<MenuProps> = (props) => {
  const { className, style, onSelect, mode, defaultIndex, defaultOpenSubMenus, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  // 设置点击事件
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 传递给menuItem的数据
  const passedContext: IMenuProps = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  };
  // 多个MenuItem构成一个数组，然后使用map进行遍历
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'AuroraMenuItem' || displayName === 'AuroraSubMenu') {
        // 克隆组件，然后传递index参数到组件
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Warning:Menu has a child which is not a menuItem component');
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

AuroraMenu.defaultProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: [],
};
export default memo(AuroraMenu);
