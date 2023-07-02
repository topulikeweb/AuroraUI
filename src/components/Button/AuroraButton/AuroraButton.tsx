import React, { memo } from 'react';
import classNames from 'classnames';

// 按钮大小
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

// 按钮类型
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

const AuroraButton: React.FC<BaseButtonProps> = (props) => {
  const { btnType, disabled, size, children, href } = props;
  // 根据传过来的属性来生成类名
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // 提供了disabled属性，且按钮属性为'Link'
    disabled: disabled && btnType === ButtonType.Link,
  });
  // Link类型的按钮
  if (btnType === ButtonType.Link && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  // 除Link以外的类型
  else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

AuroraButton.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
  children: '按钮',
};
export default memo(AuroraButton);
