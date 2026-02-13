<template>
  <div class="app">
    <el-container style="height: 100vh;">
      <el-aside width="200px" class="aside">
        <div class="logo">
          <h1>管理系统</h1>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="menu"
          router
          :collapse-transition="false"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/users">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/stocks">
            <el-icon><DataAnalysis /></el-icon>
            <span>股票管理</span>
          </el-menu-item>
          <el-menu-item index="/config">
            <el-icon><Setting /></el-icon>
            <span>系统配置</span>
          </el-menu-item>
          <el-menu-item index="/logs">
            <el-icon><Reading /></el-icon>
            <span>日志管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-icon><UserFilled /></el-icon>
                管理员
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  House,
  User,
  DataAnalysis,
  Setting,
  Reading,
  UserFilled,
  ArrowDown
} from '@element-plus/icons-vue';

const route = useRoute();
const activeMenu = computed(() => {
  return route.path;
});
</script>

<style scoped>
.app {
  height: 100vh;
}

.aside {
  background-color: #001529;
  color: white;
  overflow: hidden;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #002140;
}

.logo h1 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.menu {
  height: calc(100vh - 70px);
  border-right: none;
}

.menu :deep(.el-menu-item) {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  height: 60px;
  line-height: 60px;
}

.menu :deep(.el-menu-item:hover) {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.menu :deep(.el-menu-item.is-active) {
  color: white;
  background-color: #1890ff;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.main {
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
}
</style>
