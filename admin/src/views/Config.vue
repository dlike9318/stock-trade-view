<template>
  <div class="config">
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>系统配置</span>
        </div>
      </template>
      <el-form :model="systemConfig" label-width="120px">
        <el-form-item label="API接口地址">
          <el-input v-model="systemConfig.apiUrl" placeholder="请输入API接口地址" />
        </el-form-item>
        <el-form-item label="WebSocket地址">
          <el-input v-model="systemConfig.wsUrl" placeholder="请输入WebSocket地址" />
        </el-form-item>
        <el-form-item label="数据更新频率">
          <el-input-number v-model="systemConfig.updateInterval" :min="1" :max="60" :step="1" />
          <span style="margin-left: 10px">秒</span>
        </el-form-item>
        <el-form-item label="缓存过期时间">
          <el-input-number v-model="systemConfig.cacheExpiry" :min="1" :max="1440" :step="5" />
          <span style="margin-left: 10px">分钟</span>
        </el-form-item>
        <el-form-item label="API调用限制">
          <el-input-number v-model="systemConfig.apiLimit" :min="10" :max="1000" :step="10" />
          <span style="margin-left: 10px">次/分钟</span>
        </el-form-item>
        <el-form-item label="系统语言">
          <el-select v-model="systemConfig.language" placeholder="请选择系统语言">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
          </el-select>
        </el-form-item>
        <el-form-item label="系统主题">
          <el-select v-model="systemConfig.theme" placeholder="请选择系统主题">
            <el-option label="默认" value="default" />
            <el-option label="暗色" value="dark" />
          </el-select>
        </el-form-item>
        <el-form-item label="启用数据备份">
          <el-switch v-model="systemConfig.enableBackup" />
        </el-form-item>
        <el-form-item label="备份频率">
          <el-select v-model="systemConfig.backupFrequency" placeholder="请选择备份频率" :disabled="!systemConfig.enableBackup">
            <el-option label="每天" value="daily" />
            <el-option label="每周" value="weekly" />
            <el-option label="每月" value="monthly" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveConfig">保存配置</el-button>
          <el-button @click="resetConfig">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 系统配置
const systemConfig = ref({
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000',
  updateInterval: 5,
  cacheExpiry: 30,
  apiLimit: 100,
  language: 'zh-CN',
  theme: 'default',
  enableBackup: true,
  backupFrequency: 'daily'
});

// 保存配置
const saveConfig = () => {
  // 实际项目中这里应该调用API保存配置
  console.log('Save config:', systemConfig.value);
  alert('配置保存成功');
};

// 重置配置
const resetConfig = () => {
  systemConfig.value = {
    apiUrl: 'http://localhost:3000/api',
    wsUrl: 'ws://localhost:3000',
    updateInterval: 5,
    cacheExpiry: 30,
    apiLimit: 100,
    language: 'zh-CN',
    theme: 'default',
    enableBackup: true,
    backupFrequency: 'daily'
  };
};
</script>

<style scoped>
.config {
  padding: 20px 0;
}

.config-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
