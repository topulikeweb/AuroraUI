import React, { memo } from 'react';
import AuroraButton, {
  ButtonSize,
  ButtonType,
} from './components/Button/AuroraButton/AuroraButton';

const App: React.FC = () => {
  return (
    <div>
      <AuroraButton
        disabled
        size={ButtonSize.Large}
        btnType={ButtonType.Default}
      >
        hello world
      </AuroraButton>
      <AuroraButton btnType={ButtonType.Link} href="https://www.baidu.com">
        Baidu Link
      </AuroraButton>
    </div>
  );
};
export default memo(App);
