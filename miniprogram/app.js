// app.js
App({
  onLaunch() {
    // 初始化数据
    this.initData();
  },
  
  onShow() {
    // 监听小程序显示
    console.log('小程序显示');
  },
  
  onHide() {
    // 监听小程序隐藏
    console.log('小程序隐藏');
  },
  
  initData() {
    // 初始化全局数据
    this.globalData = {
      userInfo: null,
      stockList: [],
      selectedStock: null,
      baseUrl: 'http://localhost:3000/api'
    };
    
    // 从本地存储获取数据
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
    
    const stockList = wx.getStorageSync('stockList');
    if (stockList) {
      this.globalData.stockList = stockList;
    }
  },
  
  globalData: {
    userInfo: null,
    stockList: [],
    selectedStock: null,
    baseUrl: 'http://localhost:3000/api'
  }
});
