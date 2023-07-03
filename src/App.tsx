import React, { memo } from 'react';
import AuroraButton, {
  ButtonSize,
  ButtonType,
} from './components/Button/AuroraButton/AuroraButton';

const App: React.FC = () => {
  return (
    <div>
      <AuroraButton size={ButtonSize.Large} btnType={ButtonType.Primary}>
        Large Primary
      </AuroraButton>
      <AuroraButton size={ButtonSize.Large} btnType={ButtonType.Danger}>
        Large Primary
      </AuroraButton>
      <AuroraButton size={ButtonSize.Large} btnType={ButtonType.Default}>
        Large Primary
      </AuroraButton>
      <AuroraButton btnType={ButtonType.Link} href="https://www.baidu.com">
        Baidu Link
      </AuroraButton>
    </div>
  );
};
export default memo(App);
