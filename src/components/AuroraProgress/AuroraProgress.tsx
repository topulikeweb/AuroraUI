import React, { FC } from 'react';
import { ThemeProps } from '../AuroraIcon/AuroraIcon';
import './_style.scss';

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
  restrict?: boolean;
}

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme, restrict } = props;
  let newPercent = percent;
  if (restrict) {
    if (newPercent > 100) {
      newPercent = 100;
    }
    if (newPercent < 0) {
      newPercent = 0;
    }
  }
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${newPercent}%` }}
        >
          {showText && <span className="inner-text">{`${newPercent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: false,
  theme: 'primary',
  percent: 0,
  restrict: true,
};
export default Progress;
