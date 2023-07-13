import React, { FunctionComponentElement, ReactNode, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './AuroraMenu';
import { MenuItemProps } from './AuroraMenuItem';
import AuroraIcon, { IconProps } from '../AuroraIcon/AuroraIcon';
import { IconProp, library, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: ReactNode;
  icon?: IconProp;
  size?: SizeProp;
  color?: string;
}

const AuroraSubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const { index, title, children, className, icon = 'angle-up', size = '1x', color } = props;
  const openSubMenuArray = context.defaultOpenSubMenus as Array<string>;
  const isOpen = index && context.mode === 'vertical' ? openSubMenuArray.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpen);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  const handleClick = (e: React.MouseEvent) => {
    setOpen(!menuOpen);
  };
  let timer: any;
  // 防抖
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  // vertical模式下绑定点击事件
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  // horizontal模式下绑定鼠标指向和离开的事件
  const hoverEvent =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen,
    });
    // 判断传入的是不是AuroraMenuItem组件,是就遍历每一个然后包装在ul标签里面，否则报错
    // Children让您可以操纵和转换作为 prop 收到的 TSX,这里的children是tsx代码，用Children进行循环然后进行操作
    const childrenComponent = React.Children.map(children, (child, i: number) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'AuroraMenuItem') {
        return React.cloneElement(childElement, {
          // 将下拉框的子元素序号设置为1-1的形式
          index: `${index}-${i}`,
        });
      } else {
        console.error('Warning:Menu has a child which is not a menuItem component');
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvent} {...clickEvents}>
      <div className="submenu-title">
        {title}
        <AuroraIcon icon={icon} className="arrow-icon" size={size} color={color}></AuroraIcon>
      </div>
      {renderChildren()}
    </li>
  );
};
AuroraSubMenu.displayName = 'AuroraSubMenu';
export default AuroraSubMenu;
