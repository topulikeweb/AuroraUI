import React, { ReactNode, createContext, useState } from 'react';
import { memo } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultIndex?: number;
  children?: ReactNode;
}

export interface IMenuProps {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuProps>({ index: 0 });
const AuroraMenu: React.FC<MenuProps> = (props) => {
  const { className, style, onSelect, mode, defaultIndex, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  });
  // 设置点击事件
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 传递给menuItem的数据
  const passedContext: IMenuProps = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

AuroraMenu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};
export default memo(AuroraMenu);
