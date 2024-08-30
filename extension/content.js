console.log('DOMSentry content script loaded and running');

let SERVER_URL = 'http://localhost:3000/alert';
let MONITORING_INTERVAL = 1000;
let observerInterval;

// 从 chrome.storage 获取配置
function loadConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      serverUrl: 'http://localhost:3000/alert',
      interval: 1000
    }, function(items) {
      SERVER_URL = items.serverUrl;
      MONITORING_INTERVAL = items.interval;
      resolve();
    });
  });
}

// 创建一个 MutationObserver 实例
function createObserver() {
  return new MutationObserver((mutations) => {
    const notifications = mutations.map((mutation) => ({
      url: window.location.href,
      timestamp: new Date().toISOString(),
      type: mutation.type,
      target: mutation.target.tagName,
      addedNodes: mutation.addedNodes.length,
      removedNodes: mutation.removedNodes.length
    }));

    // 批量发送通知到服务器
    sendNotifications(notifications);
  });
}

// 配置 observer
const config = {
  attributes: true,
  childList: true,
  subtree: true
};

// 开始观察整个文档
function startObserver() {
  const observer = createObserver();
  observer.observe(document.body, config);

  // 设置间隔以定期断开和重新连接 observer
  observerInterval = setInterval(() => {
    observer.disconnect();
    observer.observe(document.body, config);
  }, MONITORING_INTERVAL);
}

// 函数：发送通知到服务器
function sendNotifications(notifications) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notifications),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}

// 初始化函数
async function initialize() {
  await loadConfig();
  startObserver();
}

// 监听配置更改
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.serverUrl) {
      SERVER_URL = changes.serverUrl.newValue;
    }
    if (changes.interval) {
      MONITORING_INTERVAL = changes.interval.newValue;
      clearInterval(observerInterval);
      startObserver();
    }
  }
});

// 启动扩展
initialize();