# DOMSentry 浏览器扩展

DOMSentry 是一个强大的浏览器扩展，专门用于监控网页 DOM 变化并将通知实时发送到本地服务器。这个工具对于网页行为分析、性能优化和调试复杂的前端交互非常有用。

## 主要功能

- 实时监控指定网页的 DOM 变化
- 高效地将变化通知发送到本地服务器
- 使用 Express.js 服务器处理和存储通知
- 支持多种 DOM 变化类型，包括属性变化和子元素变化

## 技术栈

- 前端：JavaScript (浏览器扩展)
- 后端：Node.js, Express.js
- 数据存储：SQLite

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
3. 在浏览器中打开目标网页（例如 https://github.com/Alan-333333/DOMSentry）
4. DOM 变化将自动被检测并发送到本地服务器
5. 您可以通过查看服务器控制台或数据库来监控接收到的通知

## 项目结构

```
.
├── README.md
├── extension
│   ├── background.js
│   ├── content.js
│   └── manifest.json
└── server
    ├── index.js
    ├── server.js
    ├── package.json
    └── notifications.db
```

## 配置

- 如需修改监控的网页，请编辑 `extension/manifest.json` 文件中的 `matches` 字段
- 服务器端口可以在 `server/server.js` 文件中修改

## 贡献

欢迎提交 issues 和 pull requests 来帮助改进这个项目。

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。