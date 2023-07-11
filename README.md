# 组件库基本技术栈

**React
Typescript
scss
classnames
normalize.css**

测试：

**jest**

# 组件实现思路

## AuroraButton的实现思路
首先，限定传入组件的props

然后使用classnames库，对传入的参数转换为class

写好每个class对应的样式，转换为相应的样式，这样就实现了传入不同类型的BUTTON的样式

## AuroraMenu和AuroraMenuItem
首先，和Button组件一样，限定props，使用classnames库进行class转换

然后对AuroraMenu绑定点击事件onSelect，将onSelect函数和index传递给MenuItem

然后MenuItem组件绑定onSelect,这样点击每个菜单都会触发onSelect事件

在每个MenuItem组件中传入index参数，onSelect函数中传递index参数，这样就可以知道点击的组件的index

用户可以通过获取index来进行操作
