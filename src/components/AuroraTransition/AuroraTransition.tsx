import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { CSSTransition } from 'react-transition-group';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const AuroraTransition: React.FC<TransitionProps> = (props) => {
  const { classNames, children, animation, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

AuroraTransition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default AuroraTransition;
