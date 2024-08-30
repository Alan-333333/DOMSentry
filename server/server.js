const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 连接到 SQLite 数据库
const db = new sqlite3.Database('./notifications.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the notifications database.');
});

// 创建表（如果不存在）
db.run(`CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT,
  timestamp TEXT,
  type TEXT,
  target TEXT,
  addedNodes INTEGER,
  removedNodes INTEGER
)`);

// 处理 POST 请求的路由
app.post('/alert', (req, res) => {
  const { url, timestamp, type, target, addedNodes, removedNodes } = req.body;

  db.run(`INSERT INTO notifications (url, timestamp, type, target, addedNodes, removedNodes) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    [url, timestamp, type, target, addedNodes, removedNodes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });

  console.log('Received notification:', req.body);
});

// 仪表板路由
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API 路由获取仪表板数据
app.get('/api/dashboard-data', (req, res) => {
  db.all(`SELECT type, target, timestamp FROM notifications`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const changeTypes = {};
    const elementTypes = {};
    const changeFrequency = {};

    rows.forEach(row => {
      // 统计变化类型
      changeTypes[row.type] = (changeTypes[row.type] || 0) + 1;

      // 统计元素类型
      const elementType = row.target.split('.')[0];
      elementTypes[elementType] = (elementTypes[elementType] || 0) + 1;

      // 统计变化频率
      const hour = new Date(row.timestamp).getHours();
      changeFrequency[hour] = (changeFrequency[hour] || 0) + 1;
    });

    // 准备时间标签和对应的变化频率数据
    const timeLabels = Array.from({length: 24}, (_, i) => `${i}:00`);
    const frequencyData = timeLabels.map((_, i) => changeFrequency[i] || 0);

    res.json({
      changeTypes,
      elementTypes,
      timeLabels,
      changeFrequency: frequencyData
    });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});