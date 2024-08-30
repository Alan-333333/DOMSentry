// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'reportViolation') {
    // 处理 DOM 操作违规报告
    console.log('收到违规报告:', message.data);
    // 这里可以添加将违规报告发送到服务器的逻辑
  }
});

// 在扩展安装或更新时执行的操作
chrome.runtime.onInstalled.addListener(() => {
  console.log('DOMSentry 扩展已安装或更新');
  // 可以在这里进行一些初始化设置
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // 当页面加载完成时，向内容脚本发送消息
    chrome.tabs.sendMessage(tabId, { action: 'pageLoaded' });
  }
});

// 可以添加更多后台功能，如：
// - 定期同步配置
// - 管理扩展的存储
// - 处理扩展的网络请求
