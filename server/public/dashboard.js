// 获取数据的函数
async function fetchData() {
    try {
        const response = await fetch('/api/dashboard-data');
        return await response.json();
    } catch (error) {
        console.error('获取数据失败:', error);
        return null;
    }
}

// 创建饼图：DOM 变化类型
function createChangeTypePie(data) {
    const ctx = document.getElementById('changeTypePie').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data.changeTypes),
            datasets: [{
                data: Object.values(data.changeTypes),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'DOM 变化类型分布'
            }
        }
    });
}

// 创建折线图：变化频率
function createChangeFrequencyLine(data) {
    const ctx = document.getElementById('changeFrequencyLine').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.timeLabels,
            datasets: [{
                label: '变化频率',
                data: data.changeFrequency,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: '随时间变化的 DOM 操作频率'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 创建柱状图：元素类型
function createElementTypeBar(data) {
    const ctx = document.getElementById('elementTypeBar').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data.elementTypes),
            datasets: [{
                label: '变化次数',
                data: Object.values(data.elementTypes),
                backgroundColor: 'rgba(54, 162, 235, 0.8)'
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: '最频繁变化的元素类型'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// 初始化仪表板
async function initDashboard() {
    const data = await fetchData();
    if (data) {
        createChangeTypePie(data);
        createChangeFrequencyLine(data);
        createElementTypeBar(data);
    }
}

// 当页面加载完成时初始化仪表板
document.addEventListener('DOMContentLoaded', initDashboard);