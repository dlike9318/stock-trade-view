<template>
  <div class="dashboard">
    <el-card class="dashboard-card">
      <template #header>
        <div class="card-header">
          <span>系统概览</span>
        </div>
      </template>
      <div class="stats-grid">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ systemStats.totalUsers }}</div>
            <div class="stat-label">总用户数</div>
          </div>
          <el-icon class="stat-icon"><User /></el-icon>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ systemStats.totalStocks }}</div>
            <div class="stat-label">股票数量</div>
          </div>
          <el-icon class="stat-icon"><DataAnalysis /></el-icon>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ systemStats.apiCalls }}</div>
            <div class="stat-label">API调用次数</div>
          </div>
          <el-icon class="stat-icon"><Link /></el-icon>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ systemStats.onlineUsers }}</div>
            <div class="stat-label">在线用户</div>
          </div>
          <el-icon class="stat-icon"><Monitor /></el-icon>
        </el-card>
      </div>
      
      <div class="charts-section">
        <el-card class="chart-card">
          <template #header>
            <span>API调用趋势</span>
          </template>
          <div class="chart-container">
            <el-progress :percentage="systemStats.apiUsage" :format="formatProgress" />
            <div class="usage-info">
              <span>今日调用: {{ systemStats.todayApiCalls }}次</span>
              <span>平均响应: {{ systemStats.avgResponseTime }}ms</span>
            </div>
          </div>
        </el-card>
        <el-card class="chart-card">
          <template #header>
            <span>系统状态</span>
          </template>
          <div class="status-info">
            <div class="status-item">
              <span class="status-label">服务器状态:</span>
              <el-tag :type="systemStats.serverStatus === 'running' ? 'success' : 'danger'">
                {{ systemStats.serverStatus === 'running' ? '运行中' : '异常' }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">数据库状态:</span>
              <el-tag :type="systemStats.dbStatus === 'connected' ? 'success' : 'danger'">
                {{ systemStats.dbStatus === 'connected' ? '已连接' : '断开' }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">WebSocket状态:</span>
              <el-tag :type="systemStats.wsStatus === 'connected' ? 'success' : 'danger'">
                {{ systemStats.wsStatus === 'connected' ? '已连接' : '断开' }}
              </el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">系统负载:</span>
              <el-tag :type="systemStats.load < 70 ? 'success' : systemStats.load < 90 ? 'warning' : 'danger'">
                {{ systemStats.load }}%
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  User,
  DataAnalysis,
  Link,
  Monitor
} from '@element-plus/icons-vue';

// 系统统计数据
const systemStats = ref({
  totalUsers: 128,
  totalStocks: 5000,
  apiCalls: 12500,
  onlineUsers: 32,
  apiUsage: 65,
  todayApiCalls: 3200,
  avgResponseTime: 150,
  serverStatus: 'running',
  dbStatus: 'connected',
  wsStatus: 'connected',
  load: 45
});

// 格式化进度条
const formatProgress = (percentage: number) => {
  return `${percentage}%`;
};

// 初始化数据
const initData = () => {
  // 实际项目中这里应该调用API获取真实数据
  console.log('Initializing dashboard data');
};

onMounted(() => {
  initData();
});
</script>

<style scoped>
.dashboard {
  padding: 20px 0;
}

.dashboard-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-content {
  z-index: 1;
  position: relative;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 48px;
  color: rgba(0, 0, 0, 0.05);
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  min-height: 200px;
}

.chart-container {
  padding: 20px 0;
}

.usage-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.status-info {
  padding: 20px 0;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.status-label {
  font-size: 14px;
  color: #666;
  width: 120px;
}
</style>
