<template>
  <div class="stocks">
    <el-card class="stocks-card">
      <template #header>
        <div class="card-header">
          <span>股票管理</span>
          <el-button type="primary" @click="addStock">
            <el-icon><Plus /></el-icon>
            新增股票
          </el-button>
        </div>
      </template>
      <div class="stocks-toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索股票代码或名称"
          style="width: 300px"
          prefix-icon="Search"
        />
      </div>
      <el-table :data="filteredStocks" style="width: 100%">
        <el-table-column prop="symbol" label="股票代码" />
        <el-table-column prop="name" label="股票名称" />
        <el-table-column prop="price" label="最新价" />
        <el-table-column prop="change" label="涨跌额">
          <template #default="scope">
            <span :class="{ up: scope.row.change > 0, down: scope.row.change < 0 }">
              {{ scope.row.change > 0 ? '+' : '' }}{{ scope.row.change }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="changePercent" label="涨跌幅">
          <template #default="scope">
            <span :class="{ up: scope.row.changePercent > 0, down: scope.row.changePercent < 0 }">
              {{ scope.row.changePercent > 0 ? '+' : '' }}{{ scope.row.changePercent }}%
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="market" label="市场" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="editStock(scope.row)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteStock(scope.row.symbol)">
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
          :total="stocks.length"
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
  Delete
} from '@element-plus/icons-vue';

// 股票数据
const stocks = ref([
  { symbol: '600000', name: '浦发银行', price: 8.25, change: 0.12, changePercent: 1.48, market: '沪市' },
  { symbol: '600519', name: '贵州茅台', price: 1680.00, change: -5.20, changePercent: -0.31, market: '沪市' },
  { symbol: '000001', name: '平安银行', price: 12.56, change: 0.32, changePercent: 2.61, market: '深市' },
  { symbol: '000858', name: '五粮液', price: 168.50, change: 1.20, changePercent: 0.72, market: '深市' },
  { symbol: '601318', name: '中国平安', price: 48.25, change: -0.15, changePercent: -0.31, market: '沪市' }
]);

// 搜索
const searchQuery = ref('');

// 分页
const currentPage = ref(1);
const pageSize = ref(10);

// 过滤后的股票列表
const filteredStocks = computed(() => {
  let result = stocks.value;
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(stock => 
      stock.symbol.includes(query) || 
      stock.name.toLowerCase().includes(query)
    );
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return result.slice(start, end);
});

// 添加股票
const addStock = () => {
  // 实际项目中这里应该打开添加股票的对话框
  console.log('Add stock');
};

// 编辑股票
const editStock = (stock: any) => {
  // 实际项目中这里应该打开编辑股票的对话框
  console.log('Edit stock:', stock);
};

// 删除股票
const deleteStock = (symbol: string) => {
  stocks.value = stocks.value.filter(stock => stock.symbol !== symbol);
  console.log('Delete stock:', symbol);
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
.stocks {
  padding: 20px 0;
}

.stocks-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stocks-toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.up {
  color: #52c41a;
}

.down {
  color: #ff4d4f;
}
</style>
