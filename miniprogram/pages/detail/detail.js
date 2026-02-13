// detail.js
Page({
  data: {
    stockInfo: {
      symbol: '',
      name: '',
      price: 0,
      change: 0,
      changePercent: 0
    },
    stockDetails: {
      open: 0,
      high: 0,
      low: 0,
      volume: 0,
      amount: 0,
      turnover: 0
    },
    activeTab: 'day',
    isInWatchlist: false
  },

  onLoad(options) {
    const symbol = options.symbol;
    if (symbol) {
      this.setData({
        'stockInfo.symbol': symbol
      });
      this.fetchStockData(symbol);
      this.checkWatchlist(symbol);
    }
  },

  // 获取股票数据
  fetchStockData(symbol) {
    const app = getApp();
    const baseUrl = app.globalData.baseUrl;

    // 调用后端API获取股票详情
    wx.request({
      url: `${baseUrl}/stock/${symbol}`,
      method: 'GET',
      success: (res) => {
        if (res.data) {
          this.setData({
            stockInfo: res.data
          });
          
          // 生成模拟的详细数据
          this.generateMockDetails(res.data.price);
        }
      },
      fail: (error) => {
        console.error('获取股票数据失败:', error);
        // 使用模拟数据
        this.useMockData(symbol);
      }
    });
  },

  // 使用模拟数据
  useMockData(symbol) {
    const mockData = {
      '600000': { symbol: '600000', name: '浦发银行', price: 8.25, change: 0.12, changePercent: 1.48 },
      '600519': { symbol: '600519', name: '贵州茅台', price: 1680.00, change: -5.20, changePercent: -0.31 },
      '000001': { symbol: '000001', name: '平安银行', price: 12.56, change: 0.32, changePercent: 2.61 },
      '000858': { symbol: '000858', name: '五粮液', price: 168.50, change: 1.20, changePercent: 0.72 },
      '601318': { symbol: '601318', name: '中国平安', price: 48.25, change: -0.15, changePercent: -0.31 }
    };

    const stockData = mockData[symbol] || { symbol, name: '未知股票', price: 0, change: 0, changePercent: 0 };
    this.setData({
      stockInfo: stockData
    });
    
    this.generateMockDetails(stockData.price);
  },

  // 生成模拟的详细数据
  generateMockDetails(basePrice) {
    const open = basePrice * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(basePrice, open) * (1 + Math.random() * 0.03);
    const low = Math.min(basePrice, open) * (1 - Math.random() * 0.03);
    const volume = Math.floor(Math.random() * 1000000) + 100000;
    const amount = volume * basePrice;
    const turnover = (Math.random() * 5).toFixed(2);

    this.setData({
      stockDetails: {
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        volume: volume.toLocaleString(),
        amount: (amount / 10000).toFixed(2) + '万',
        turnover: turnover
      }
    });
  },

  // 切换图表标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    // 实际项目中这里应该根据标签切换不同的图表数据
  },

  // 检查是否在自选列表中
  checkWatchlist(symbol) {
    const watchlist = wx.getStorageSync('watchlist') || [];
    const isInList = watchlist.includes(symbol);
    this.setData({
      isInWatchlist: isInList
    });
  },

  // 添加/移除自选
  addToWatchlist() {
    const symbol = this.data.stockInfo.symbol;
    let watchlist = wx.getStorageSync('watchlist') || [];
    
    if (this.data.isInWatchlist) {
      // 移除自选
      watchlist = watchlist.filter(item => item !== symbol);
      this.setData({ isInWatchlist: false });
      wx.showToast({ title: '已移除自选', icon: 'success' });
    } else {
      // 添加自选
      watchlist.push(symbol);
      this.setData({ isInWatchlist: true });
      wx.showToast({ title: '已添加自选', icon: 'success' });
    }
    
    // 保存到本地存储
    wx.setStorageSync('watchlist', watchlist);
  },

  // 刷新数据
  refreshData() {
    const symbol = this.data.stockInfo.symbol;
    if (symbol) {
      this.fetchStockData(symbol);
      wx.showToast({ title: '数据已刷新', icon: 'success' });
    }
  }
});
