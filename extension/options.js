// 保存选项到 Chrome 存储
function saveOptions() {
    const serverUrl = document.getElementById('serverUrl').value;
    chrome.storage.sync.set({
        serverUrl: serverUrl
    }, function() {
        // 更新状态以让用户知道选项已保存。
        const status = document.getElementById('status');
        status.textContent = '选项已保存。';
        setTimeout(function() {
            status.textContent = '';
        }, 2000);
    });
}

// 从 Chrome 存储中恢复选项
function restoreOptions() {
    chrome.storage.sync.get({
        serverUrl: 'http://localhost:3000' // 默认值
    }, function(items) {
        document.getElementById('serverUrl').value = items.serverUrl;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);