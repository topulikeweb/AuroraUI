import React, { CSSProperties, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import './_style.scss';
import AuroraIcon from '../AuroraIcon/AuroraIcon';

type InputSize = 'lg' | 'sm';

// 这里的size属性和InputHTMLAttributes中的size属性进行了冲突，使用Omit来忽略冲突
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  style?: CSSProperties;
}

export const AuroraInput: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, value, append, style, ...restProps } = props;
  // 根据属性判断className
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  });
  // 让input中始终保持有值，避免出现undefined和null的情况出现
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    } else {
      return value;
    }
  };
  // 如果用户传递了value，就将原来的value经过处理换掉，防止出现undefined和null的情况出现
  if ('value' in restProps) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }
  return (
    <div className={classes} style={style}>
      {/*前缀*/}
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {/*图标*/}
      {icon && (
        <div className="icon-wrapper">
          <AuroraIcon icon={icon} title={`title-${icon}`}></AuroraIcon>
        </div>
      )}
      {/*输入框*/}
      <input className="viking-input-inner" disabled={disabled} {...restProps} value={value} />
      {/*后缀*/}
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};
AuroraInput.defaultProps = {
  style: { width: 300 },
};
export default AuroraInput;
