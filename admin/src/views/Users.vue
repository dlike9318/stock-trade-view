<template>
  <div class="users">
    <el-card class="users-card">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="addUser">
            <el-icon><Plus /></el-icon>
            新增用户
          </el-button>
        </div>
      </template>
      <div class="users-toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户名或邮箱"
          style="width: 300px"
          prefix-icon="Search"
        />
        <el-select v-model="userStatus" placeholder="用户状态" style="width: 150px; margin-left: 10px">
          <el-option label="全部" value="" />
          <el-option label="活跃" value="active" />
          <el-option label="禁用" value="disabled" />
        </el-select>
      </div>
      <el-table :data="filteredUsers" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '活跃' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editUser(scope.row)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button
              size="small"
              :type="scope.row.status === 'active' ? 'warning' : 'success'"
              @click="toggleUserStatus(scope.row)"
            >
              <el-icon>{{ scope.row.status === 'active' ? 'Lock' : 'Unlock' }}</el-icon>
              {{ scope.row.status === 'active' ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="users.length"
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
  Plus,
  Search,
  Edit,
  Lock,
  Unlock,
  Delete
} from '@element-plus/icons-vue';

// 用户数据
const users = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: 'active', createdAt: '2026-01-01T00:00:00Z' },
  { id: 2, username: 'user1', email: 'user1@example.com', role: '普通用户', status: 'active', createdAt: '2026-01-02T00:00:00Z' },
  { id: 3, username: 'user2', email: 'user2@example.com', role: '普通用户', status: 'disabled', createdAt: '2026-01-03T00:00:00Z' },
  { id: 4, username: 'user3', email: 'user3@example.com', role: '普通用户', status: 'active', createdAt: '2026-01-04T00:00:00Z' },
  { id: 5, username: 'user4', email: 'user4@example.com', role: '普通用户', status: 'active', createdAt: '2026-01-05T00:00:00Z' }
]);

// 搜索和筛选
const searchQuery = ref('');
const userStatus = ref('');

// 分页
const currentPage = ref(1);
const pageSize = ref(10);

// 过滤后的用户列表
const filteredUsers = computed(() => {
  let result = users.value;
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.username.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }
  
  // 状态过滤
  if (userStatus.value) {
    result = result.filter(user => user.status === userStatus.value);
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return result.slice(start, end);
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN');
};

// 添加用户
const addUser = () => {
  // 实际项目中这里应该打开添加用户的对话框
  console.log('Add user');
};

// 编辑用户
const editUser = (user: any) => {
  // 实际项目中这里应该打开编辑用户的对话框
  console.log('Edit user:', user);
};

// 切换用户状态
const toggleUserStatus = (user: any) => {
  user.status = user.status === 'active' ? 'disabled' : 'active';
  console.log('Toggle user status:', user);
};

// 删除用户
const deleteUser = (userId: number) => {
  users.value = users.value.filter(user => user.id !== userId);
  console.log('Delete user:', userId);
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
.users {
  padding: 20px 0;
}

.users-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.users-toolbar {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
