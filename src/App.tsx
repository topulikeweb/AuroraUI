import React, { memo } from 'react';
import AuroraButton, { ButtonSize, ButtonType } from './components/AuroraButton/AuroraButton';
import AuroraMenu from './components/AuroraMenu/AuroraMenu';
import AuroraMenuItem from './components/AuroraMenu/AuroraMenuItem';
import AuroraSubMenu from './components/AuroraMenu/AuroraSubMenu';

const App: React.FC = () => {
  return (
    <div>
      <AuroraMenu
        defaultIndex={0}
        mode={'vertical'}
        onSelect={(selectIndex) => {
          console.log(selectIndex);
        }}
      >
        <AuroraMenuItem>首页</AuroraMenuItem>
        <AuroraMenuItem>发现</AuroraMenuItem>
        <AuroraSubMenu title="我的">
          <AuroraMenuItem>group1</AuroraMenuItem>
          <AuroraMenuItem>group2</AuroraMenuItem>
          <AuroraMenuItem>group3</AuroraMenuItem>
        </AuroraSubMenu>
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
