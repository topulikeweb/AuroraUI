import React, { memo, useState } from 'react';
import AuroraButton from './components/AuroraButton/AuroraButton';
import AuroraMenu from './components/AuroraMenu/AuroraMenu';
import AuroraMenuItem from './components/AuroraMenu/AuroraMenuItem';
import AuroraSubMenu from './components/AuroraMenu/AuroraSubMenu';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import AuroraTransition from './components/AuroraTransition/AuroraTransition';
import AuroraInput from './components/AuroraInput/AuroraInput';
// 添加所有SVG图标
library.add(fas);
const App: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <AuroraMenu
        defaultIndex={'0'}
        mode={'vertical'}
        defaultOpenSubMenus={['2']}
        onSelect={(selectIndex) => {
          console.log(selectIndex);
        }}
      >
        <AuroraMenuItem>首页</AuroraMenuItem>
        <AuroraMenuItem>发现</AuroraMenuItem>
        <AuroraSubMenu title="我的" icon="angle-up">
          <AuroraMenuItem>group1</AuroraMenuItem>
          <AuroraMenuItem>group2</AuroraMenuItem>
          <AuroraMenuItem>group3</AuroraMenuItem>
        </AuroraSubMenu>
      </AuroraMenu>
      <AuroraButton
        size={'lg'}
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle
      </AuroraButton>
      <AuroraTransition in={show} timeout={300} animation={'zoom-in-left'}>
        <div>
          <p>
            Edit<code>src/App.tsx</code>
          </p>
          <p>
            Edit<code>src/App.tsx</code>
          </p>
          <p>
            Edit<code>src/App.tsx</code>
          </p>
        </div>
      </AuroraTransition>

      <AuroraTransition in={show} timeout={300} animation={'zoom-in-left'} wrapper>
        <AuroraButton>点击</AuroraButton>
      </AuroraTransition>

      <AuroraInput style={{ width: 300 }} defaultValue={1111} value={'hhhh'}></AuroraInput>
    </div>
  );
};
export default memo(App);
