import React, { ReactNode } from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { CSSTransition } from 'react-transition-group';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom';

/**
 * @author topu
 * @date 2023/7/16
 * @Description 如果children当前已经有了动画，动画就不会起效果，所以要设置为wrapper为true，加一个父盒子，将AuroraTransition的动画加到父盒子上
 * @param {type} [param] 参数说明
 * @return 返回值
 */
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  children?: ReactNode;
};

const AuroraTransition: React.FC<TransitionProps> = (props) => {
  const { classNames, children, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

AuroraTransition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default AuroraTransition;
