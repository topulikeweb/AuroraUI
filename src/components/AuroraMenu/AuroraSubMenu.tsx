import React, { FunctionComponentElement, ReactNode, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './AuroraMenu';
import { MenuItemProps } from './AuroraMenuItem';
import { Simulate } from 'react-dom/test-utils';
import toggle = Simulate.toggle;

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
  children?: ReactNode;
}

const AuroraSubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const [menuOpen, setOpen] = useState(false);
  const { index, title, children, className } = props;
  const classes = classNames('menu-item submenu-item', {
    'is-active': index === context.index,
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
    const childrenComponent = React.Children.map(children, (child, index: number) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'AuroraMenuItem') {
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error('Warning:Menu has a child which is not a menuItem component');
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes}>
      <div className="submenu-title" {...hoverEvent} {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};
AuroraSubMenu.displayName = 'AuroraSubMenu';
export default AuroraSubMenu;
