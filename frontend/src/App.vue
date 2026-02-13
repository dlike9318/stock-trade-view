<template>
  <div class="app">
    <header class="header">
      <h1>股市实时交易数据</h1>
    </header>
    
    <main class="main">
      <section class="market-overview">
        <h2>市场概览</h2>
        <div class="market-stats">
          <div class="stat-item">
            <span class="stat-label">上涨</span>
            <span class="stat-value up">{{ marketData.upCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">下跌</span>
            <span class="stat-value down">{{ marketData.downCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">平盘</span>
            <span class="stat-value">{{ marketData.flatCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">时间</span>
            <span class="stat-value">{{ formatTime(marketData.timestamp) }}</span>
          </div>
        </div>
      </section>
      
      <section class="stock-list">
        <h2>股票列表</h2>
        <div class="stock-table">
          <table>
            <thead>
              <tr>
                <th>代码</th>
                <th>名称</th>
                <th>最新价</th>
                <th>涨跌额</th>
                <th>涨跌幅</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in marketData.stocks" :key="stock.symbol">
                <td>{{ stock.symbol }}</td>
                <td>{{ stock.name }}</td>
                <td>{{ stock.price }}</td>
                <td :class="{ up: stock.change > 0, down: stock.change < 0 }">
                  {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}
                </td>
                <td :class="{ up: stock.changePercent > 0, down: stock.changePercent < 0 }">
                  {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
                </td>
                <td>
                  <button @click="viewStockDetail(stock.symbol)" class="btn">查看详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <section v-if="selectedStock" class="stock-detail">
        <h2>{{ selectedStock.name }} ({{ selectedStock.symbol }})</h2>
        <div class="stock-info">
          <div class="info-item">
            <span class="info-label">最新价:</span>
            <span class="info-value">{{ selectedStock.price }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">涨跌额:</span>
            <span :class="{ up: selectedStock.change > 0, down: selectedStock.change < 0 }" class="info-value">
              {{ selectedStock.change > 0 ? '+' : '' }}{{ selectedStock.change }}
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">涨跌幅:</span>
            <span :class="{ up: selectedStock.changePercent > 0, down: selectedStock.changePercent < 0 }" class="info-value">
              {{ selectedStock.changePercent > 0 ? '+' : '' }}{{ selectedStock.changePercent }}%
            </span>
          </div>
        </div>
        
        <div class="chart-container">
          <h3>价格走势图</h3>
          <v-chart :option="chartOption" style="width: 100%; height: 400px;"></v-chart>
        </div>
      </section>
    </main>
    
    <footer class="footer">
      <p>© 2026 股市实时交易数据展示系统</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import axios from 'axios';
import { io } from 'socket.io-client';
import config from './config';

// 注册ECharts组件
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
]);

// 市场数据
const marketData = ref({
  stocks: [],
  upCount: 0,
  downCount: 0,
  flatCount: 0,
  timestamp: new Date().toISOString()
});

// 选中的股票
const selectedStock = ref<any>(null);

// 图表数据
const chartData = ref<any[]>([]);

// 计算图表配置
const chartOption = computed(() => {
  return {
    animation: false, // 禁用动画，提高性能
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return params[0].name + '<br/>' + params[0].value + '元';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.value.map(item => item.time),
      axisLabel: {
        interval: Math.floor(chartData.value.length / 10) // 减少标签数量
      }
    },
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: '价格',
        type: 'line',
        data: chartData.value.map(item => item.price),
        smooth: true,
        symbol: 'none', // 禁用数据点，提高性能
        itemStyle: {
          color: '#5470c6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(84, 112, 198, 0.3)'
            }, {
              offset: 1, color: 'rgba(84, 112, 198, 0.1)'
            }]
          }
        }
      }
    ]
  };
});

// 格式化时间
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 查看股票详情
const viewStockDetail = async (symbol: string) => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/stock/${symbol}`);
    selectedStock.value = response.data;
    
    // 生成模拟图表数据
    generateChartData(selectedStock.value.price);
  } catch (error) {
    console.error('Error fetching stock detail:', error);
  }
};

// 生成模拟图表数据
const generateChartData = (basePrice: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    const price = basePrice + (Math.random() - 0.5) * basePrice * 0.05;
    
    data.push({
      time: time.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      price: parseFloat(price.toFixed(2))
    });
  }
  
  chartData.value = data;
};

// 初始化WebSocket连接
const initWebSocket = () => {
  const socket = io(config.wsUrl, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });
  
  socket.on('realtime_data', (data: any) => {
    // 仅当数据发生变化时才更新，减少重渲染
    if (JSON.stringify(marketData.value.stocks) !== JSON.stringify(data.stocks)) {
      marketData.value = data;
      
      // 如果当前有选中的股票，更新其数据
      if (selectedStock.value) {
        const updatedStock = data.stocks.find((s: any) => s.symbol === selectedStock.value.symbol);
        if (updatedStock) {
          selectedStock.value = updatedStock;
        }
      }
    }
  });
  
  socket.on('connect', () => {
    console.log('WebSocket connected');
  });
  
  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
  
  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
};

// 初始化数据
const initData = async () => {
  try {
    const response = await axios.get(`${config.apiBaseUrl}/stock/list`);
    marketData.value.stocks = response.data;
    marketData.value.upCount = response.data.filter((s: any) => s.change > 0).length;
    marketData.value.downCount = response.data.filter((s: any) => s.change < 0).length;
    marketData.value.flatCount = response.data.filter((s: any) => s.change === 0).length;
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

// 组件挂载时初始化
onMounted(() => {
  initData();
  initWebSocket();
});
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.market-overview {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.market-stats {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  min-width: 100px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.stat-value.up {
  color: #52c41a;
}

.stat-value.down {
  color: #ff4d4f;
}

.stock-list {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.stock-table {
  overflow-x: auto;
  margin-top: 10px;
}

.stock-table table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.stock-table th,
.stock-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.stock-table th {
  background-color: #fafafa;
  font-weight: bold;
}

.stock-table tr:hover {
  background-color: #f5f5f5;
}

.up {
  color: #52c41a;
}

.down {
  color: #ff4d4f;
}

.btn {
  padding: 6px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #40a9ff;
}

.stock-detail {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.stock-info {
  display: flex;
  gap: 30px;
  margin: 20px 0;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-label {
  font-size: 14px;
  color: #666;
}

.info-value {
  font-size: 18px;
  font-weight: bold;
}

.chart-container {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: #666;
  border-top: 1px solid #e8e8e8;
}
</style>
