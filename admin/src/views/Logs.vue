<template>
  <div class="logs">
    <el-card class="logs-card">
      <template #header>
        <div class="card-header">
          <span>日志管理</span>
          <el-button type="primary" @click="exportLogs">
            <el-icon><Download /></el-icon>
            导出日志
          </el-button>
        </div>
      </template>
      <div class="logs-toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索日志内容"
          style="width: 300px"
          prefix-icon="Search"
        />
        <el-select v-model="logLevel" placeholder="日志级别" style="width: 150px; margin-left: 10px">
          <el-option label="全部" value="" />
          <el-option label="INFO" value="info" />
          <el-option label="WARN" value="warn" />
          <el-option label="ERROR" value="error" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 300px; margin-left: 10px"
        />
      </div>
      <el-table :data="filteredLogs" style="width: 100%">
        <el-table-column prop="timestamp" label="时间" width="200" />
        <el-table-column prop="level" label="级别" width="100">
          <template #default="scope">
            <el-tag :type="getLogLevelType(scope.row.level)">
              {{ scope.row.level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="类别" width="150" />
        <el-table-column prop="message" label="内容" />
        <el-table-column prop="ip" label="IP地址" width="150" />
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="logs.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Download,
  Search
} from '@element-plus/icons-vue';

// 日志数据
const logs = ref([
  { timestamp: '2026-02-12 17:00:00', level: 'info', category: 'system', message: '系统启动', ip: '127.0.0.1' },
  { timestamp: '2026-02-12 17:05:00', level: 'info', category: 'api', message: 'API调用: /api/stock/list', ip: '192.168.1.100' },
  { timestamp: '2026-02-12 17:10:00', level: 'warn', category: 'database', message: '数据库连接超时', ip: '127.0.0.1' },
  { timestamp: '2026-02-12 17:15:00', level: 'error', category: 'api', message: 'API调用失败: /api/stock/600000', ip: '192.168.1.101' },
  { timestamp: '2026-02-12 17:20:00', level: 'info', category: 'user', message: '用户登录: admin', ip: '192.168.1.102' }
]);

// 搜索和筛选
const searchQuery = ref('');
const logLevel = ref('');
const dateRange = ref<any[]>([]);

// 分页
const currentPage = ref(1);
const pageSize = ref(10);

// 过滤后的日志列表
const filteredLogs = computed(() => {
  let result = logs.value;
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(log => 
      log.message.toLowerCase().includes(query) ||
      log.category.toLowerCase().includes(query)
    );
  }
  
  // 日志级别过滤
  if (logLevel.value) {
    result = result.filter(log => log.level === logLevel.value);
  }
  
  // 日期范围过滤
  if (dateRange.value && dateRange.value.length === 2) {
    const start = dateRange.value[0];
    const end = dateRange.value[1];
    result = result.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= start && logDate <= end;
    });
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return result.slice(start, end);
});

// 获取日志级别对应的标签类型
const getLogLevelType = (level: string) => {
  switch (level) {
    case 'info': return 'info';
    case 'warn': return 'warning';
    case 'error': return 'danger';
    default: return '';
  }
};

// 导出日志
const exportLogs = () => {
  // 实际项目中这里应该实现日志导出功能
  console.log('Export logs');
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
};
</script>

<style scoped>
.logs {
  padding: 20px 0;
}

.logs-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logs-toolbar {
  display: flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
