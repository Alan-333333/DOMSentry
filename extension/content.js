// 配置
const SERVER_URL = 'http://localhost:3000/alert';

// 创建一个 MutationObserver 实例
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 为每个变化创建一个通知
    const notification = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      type: mutation.type,
      target: mutation.target.tagName,
      addedNodes: mutation.addedNodes.length,
      removedNodes: mutation.removedNodes.length
    };

    // 发送通知到服务器
    sendNotification(notification);
  });
});

// 配置 observer
const config = {
  attributes: true,
  childList: true,
  subtree: true
};

// 开始观察整个文档
observer.observe(document.body, config);

// 函数：发送通知到服务器
function sendNotification(notification) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}

// 添加一些调试信息
console.log('DOMSentry content script loaded and running');