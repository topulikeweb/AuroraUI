import React, { memo } from 'react';
import AuroraButton, { ButtonSize, ButtonType } from './components/AuroraButton/AuroraButton';
import AuroraMenu from './components/AuroraMenu/AuroraMenu';
import AuroraMenuItem from './components/AuroraMenu/AuroraMenuItem';

const App: React.FC = () => {
  return (
    <div>
      <AuroraMenu
        onSelect={(selectIndex) => {
          alert(selectIndex);
        }}
      >
        <AuroraMenuItem index={1}>首页</AuroraMenuItem>
        <AuroraMenuItem index={2}>发现</AuroraMenuItem>
        <AuroraMenuItem index={3}>我的</AuroraMenuItem>
      </AuroraMenu>
      <AuroraButton size={ButtonSize.Large} btnType={ButtonType.Primary}>
        Large Primary
      </AuroraButton>
      <AuroraButton size={ButtonSize.Large} btnType={ButtonType.Danger} disabled>
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
