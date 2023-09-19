import React from 'react';
import AuroraMenu, { MenuProps } from './AuroraMenu';
import AuroraMenuItem, { MenuItemProps } from './AuroraMenuItem';
import AuroraSubMenu, { SubMenuProps } from './AuroraSubMenu';

export type IMenuComponent = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>;
  SubMenu: React.FC<SubMenuProps>;
};
const TransMenu = AuroraMenu as unknown as IMenuComponent;
TransMenu.Item = AuroraMenuItem;
TransMenu.SubMenu = AuroraSubMenu;
export default TransMenu;
