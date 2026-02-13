// index.js
Page({
  data: {
    marketData: {
      stocks: [],
      upCount: 0,
      downCount: 0,
      flatCount: 0
    },
    searchQuery: '',
    updateTime: '',
    filteredStocks: []
  },

  onLoad() {
    this.initData();
    this.startRefreshInterval();
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshData();
  },

  onUnload() {
    // 清除定时器
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  },

  // 初始化数据
  initData() {
    this.refreshData();
  },

  // 刷新数据
  refreshData() {
    const app = getApp();
    const baseUrl = app.globalData.baseUrl;

    // 调用后端API获取股票列表
    wx.request({
      url: `${baseUrl}/stock/list`,
      method: 'GET',
      success: (res) => {
        if (res.data) {
          const stocks = res.data;
          const upCount = stocks.filter(s => s.change > 0).length;
          const downCount = stocks.filter(s => s.change < 0).length;
          const flatCount = stocks.filter(s => s.change === 0).length;

          this.setData({
            marketData: {
              stocks,
              upCount,
              downCount,
              flatCount
            },
            filteredStocks: stocks,
            updateTime: new Date().toLocaleTimeString()
          });

          // 保存到全局数据
          app.globalData.stockList = stocks;
        }
      },
      fail: (error) => {
        console.error('获取股票数据失败:', error);
        // 使用模拟数据
        this.useMockData();
      }
    });
  },

  // 使用模拟数据
  useMockData() {
    const mockStocks = [
      { symbol: '600000', name: '浦发银行', price: 8.25, change: 0.12, changePercent: 1.48 },
      { symbol: '600519', name: '贵州茅台', price: 1680.00, change: -5.20, changePercent: -0.31 },
      { symbol: '000001', name: '平安银行', price: 12.56, change: 0.32, changePercent: 2.61 },
      { symbol: '000858', name: '五粮液', price: 168.50, change: 1.20, changePercent: 0.72 },
      { symbol: '601318', name: '中国平安', price: 48.25, change: -0.15, changePercent: -0.31 }
    ];

    const upCount = mockStocks.filter(s => s.change > 0).length;
    const downCount = mockStocks.filter(s => s.change < 0).length;
    const flatCount = mockStocks.filter(s => s.change === 0).length;

    this.setData({
      marketData: {
        stocks: mockStocks,
        upCount,
        downCount,
        flatCount
      },
      filteredStocks: mockStocks,
      updateTime: new Date().toLocaleTimeString()
    });
  },

  // 开始定时刷新
  startRefreshInterval() {
    this.refreshTimer = setInterval(() => {
      this.refreshData();
    }, 30000); // 每30秒刷新一次
  },

  // 搜索功能
  onSearch(e) {
    const query = e.detail.value;
    this.setData({ searchQuery: query });

    if (!query) {
      this.setData({ filteredStocks: this.data.marketData.stocks });
      return;
    }

    const filtered = this.data.marketData.stocks.filter(stock => {
      return stock.symbol.includes(query) || 
             stock.name.toLowerCase().includes(query.toLowerCase());
    });

    this.setData({ filteredStocks: filtered });
  },

  // 跳转到股票详情页
  goToDetail(e) {
    const symbol = e.currentTarget.dataset.symbol;
    wx.navigateTo({
      url: `/pages/detail/detail?symbol=${symbol}`
    });
  }
});
