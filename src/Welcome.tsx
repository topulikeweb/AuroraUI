import React from 'react';
import './_welcome.scss';

const Welcome: React.FC = () => {
  return (
    <div className="welcome-message">
      <h1>🌟 欢迎使用 AuroraUI 🌟</h1>
      <p>感谢您选择 AuroraUI，这是一个令人愉快的 React 组件库，为您提供了创造美丽用户界面的工具。✨</p>
      <p>如何使用？</p>
      <h3>npm i aurora-topu</h3>
      <p>AuroraUI 有着丰富的组件，可以满足各种项目需求。无论您是在开发个人项目还是团队项目，AuroraUI 都能助您一臂之力。🚀</p>
      <p>
        作者非常注重开发者社区的反馈和贡献，所以请随时访问我们的 GitHub 仓库并参与进来：
        <a href="https://github.com/topulikeweb/AuroraUI" target="_blank" rel="noopener noreferrer">
          https://github.com/topulikeweb/AuroraUI
        </a>
      </p>
      <p>祝您使用 AuroraUI 的愉快时光！😊</p>
      <p>如果您有任何问题，可以随时联系作者。我们随时为您提供帮助和支持。</p>
      <p>再次感谢您的选择，期待与您一起构建出色的界面！🎉</p>
    </div>
  );
};

export default Welcome;
