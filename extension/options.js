// 保存选项
function saveOptions() {
    const serverUrl = document.getElementById('serverUrl').value;
    const interval = document.getElementById('interval').value;
    
    chrome.storage.sync.set({
      serverUrl: serverUrl,
      interval: parseInt(interval)
    }, function() {
      // 更新状态以让用户知道选项已保存。
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // 加载保存的选项
  function restoreOptions() {
    chrome.storage.sync.get({
      serverUrl: 'http://localhost:3000/alert',
      interval: 1000
    }, function(items) {
      document.getElementById('serverUrl').value = items.serverUrl;
      document.getElementById('interval').value = items.interval;
    });
  }
  
  // 当 DOM 加载完成时，恢复选项并添加事件监听器
  document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    document.getElementById('save').addEventListener('click', saveOptions);
  });