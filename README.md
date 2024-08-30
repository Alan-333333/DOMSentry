# DOMSentry 浏览器扩展

DOMSentry 是一个功能强大的浏览器扩展，专门用于监控网页 DOM 变化并将通知实时发送到可配置的服务器。它还提供了服务端的数据可视化功能，使得 DOM 变化分析变得直观和高效。

## 主要功能

- 实时监控指定网页的 DOM 变化
- 高效地将变化通知发送到可配置的服务器
- 使用 Express.js 服务器处理和存储通知
- 支持多种 DOM 变化类型，包括属性变化和子元素变化
- 插件支持自定义服务器地址配置
- 服务端提供实时数据可视化界面

## 技术栈

- 前端：JavaScript (浏览器扩展), HTML, CSS
- 后端：Node.js, Express.js
- 数据存储：SQLite
- 数据可视化：Chart.js

## 安装说明

### 浏览器扩展

1. 打开 Chrome 浏览器，进入 `chrome://extensions/`
2. 在右上角启用"开发者模式"
3. 点击左上角的"加载已解压的扩展程序"按钮
4. 在文件选择器中，导航到项目目录并选择 `extension` 文件夹
5. 确认扩展已成功加载并启用

### 服务器

1. 确保您的系统已安装 Node.js（推荐版本 14.0.0 或更高）
2. 打开终端或命令提示符，导航到项目的 `server` 文件夹
3. 运行以下命令安装依赖：
   ```
   npm install
   ```
4. 安装完成后，使用以下命令启动服务器：
   ```
   npm start
   ```
5. 服务器默认将在 `http://localhost:3000` 运行

## 使用方法

1. 按照上述步骤启动服务器
2. 确保 DOMSentry 浏览器扩展已在 Chrome 中启用
3. 右键点击扩展图标，选择"选项"，设置服务器地址
4. 在浏览器中打开目标网页
5. DOM 变化将自动被检测并发送到配置的服务器
6. 访问 `http://localhost:3000/dashboard` 查看实时数据可视化界面

## 项目结构

```
.
├── README.md
├── extension
│   ├── background.js
│   ├── content.js
│   ├── options.html
│   ├── options.js
│   └── manifest.json
└── server
    ├── index.js
    ├── server.js
    ├── dashboard.html
    ├── dashboard.js
    ├── package.json
    └── notifications.db
```

## 配置

- 服务器地址可以在扩展的选项页面中配置
- 如需修改监控的网页，请编辑 `extension/manifest.json` 文件中的 `matches` 字段
- 服务器端口可以在 `server/server.js` 文件中修改

## 数据可视化

访问 `http://localhost:3000/dashboard` 来查看实时的数据可视化界面。该界面提供：

- DOM 变化类型的饼图统计
- 随时间变化的 DOM 操作频率折线图
- 最频繁变化的元素类型柱状图

## 贡献

欢迎提交 issues 和 pull requests 来帮助改进这个项目。

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。