let SERVER_URL = 'http://localhost:3000/alert';

// 从存储中加载配置
function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      serverUrl: 'http://localhost:3000/alert',
      interval: 1000
    }, function(items) {
      SERVER_URL = items.serverUrl;
      resolve(items);
    });
  });
}

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'reportViolation') {
    // 处理 DOM 操作违规报告
    console.log('收到违规报告:', message.data);
    // 将违规报告发送到服务器
    sendToServer(message.data);
  }
});

// 在扩展安装或更新时执行的操作
chrome.runtime.onInstalled.addListener(() => {
  console.log('DOMSentry 扩展已安装或更新');
  loadConfig().then(() => {
    console.log('配置已加载');
  });
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // 当页面加载完成时，向内容脚本发送消息
    chrome.tabs.sendMessage(tabId, { 
      action: 'pageLoaded',
      config: { serverUrl: SERVER_URL }
    });
  }
});

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.serverUrl) {
      SERVER_URL = changes.serverUrl.newValue;
      console.log('服务器 URL 已更新:', SERVER_URL);
    }
    // 将更新后的配置发送给所有活动的标签页
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { 
          action: 'configUpdated',
          config: { serverUrl: SERVER_URL }
        });
      });
    });
  }
});

// 发送数据到服务器
function sendToServer(data) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('成功发送到服务器:', data))
  .catch((error) => console.error('发送到服务器时出错:', error));
}

// 定期同步配置（每小时）
setInterval(() => {
  loadConfig().then(() => {
    console.log('配置已同步');
  });
}, 3600000);

console.log('DOMSentry background script 已加载');