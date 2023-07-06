import React, { memo, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './AuroraMenu';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: string;
}

const AuroraMenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const handleClick = () => {
    // 触发父组件的onSelect，设置激活状态的index
    if (!disabled && context.onSelect) {
      context.onSelect(index);
    }
  };
  return (
    <li
      className={classes}
      style={style}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </li>
  );
};

AuroraMenuItem.defaultProps = {
  children: '菜单',
};
export default memo(AuroraMenuItem);
