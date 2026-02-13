const axios = require('axios');

// 模拟股票数据
const mockStocks = [
  { symbol: '600000', name: '浦发银行', price: 8.25, change: 0.12, changePercent: 1.48 },
  { symbol: '600519', name: '贵州茅台', price: 1680.00, change: -5.20, changePercent: -0.31 },
  { symbol: '000001', name: '平安银行', price: 12.56, change: 0.32, changePercent: 2.61 },
  { symbol: '000858', name: '五粮液', price: 168.50, change: 1.20, changePercent: 0.72 },
  { symbol: '601318', name: '中国平安', price: 48.25, change: -0.15, changePercent: -0.31 }
];

class StockDataService {
  // 获取单个股票数据
  async getStockData(symbol) {
    try {
      // 实际项目中这里应该调用真实的API
      // const response = await axios.get(`https://api.example.com/stock/${symbol}`);
      // return response.data;
      
      // 使用模拟数据
      const stock = mockStocks.find(s => s.symbol === symbol);
      if (!stock) {
        throw new Error('Stock not found');
      }
      
      // 模拟实时数据变化
      stock.price = this.randomizePrice(stock.price);
      stock.change = this.calculateChange(stock.price, stock.price - stock.change);
      stock.changePercent = this.calculateChangePercent(stock.change, stock.price - stock.change);
      
      return stock;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
  
  // 获取股票列表
  async getStockList() {
    try {
      // 实际项目中这里应该调用真实的API
      // const response = await axios.get('https://api.example.com/stocks');
      // return response.data;
      
      // 使用模拟数据
      return mockStocks.map(stock => {
        // 模拟实时数据变化
        const newPrice = this.randomizePrice(stock.price);
        const change = this.calculateChange(newPrice, stock.price - stock.change);
        const changePercent = this.calculateChangePercent(change, stock.price - stock.change);
        
        return {
          ...stock,
          price: newPrice,
          change,
          changePercent
        };
      });
    } catch (error) {
      console.error('Error fetching stock list:', error);
      throw error;
    }
  }
  
  // 获取市场概览
  async getMarketOverview() {
    try {
      // 实际项目中这里应该调用真实的API
      // const response = await axios.get('https://api.example.com/market/overview');
      // return response.data;
      
      // 使用模拟数据
      const stocks = await this.getStockList();
      const upCount = stocks.filter(s => s.change > 0).length;
      const downCount = stocks.filter(s => s.change < 0).length;
      const flatCount = stocks.filter(s => s.change === 0).length;
      
      return {
        stocks,
        marketStatus: 'trading',
        upCount,
        downCount,
        flatCount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market overview:', error);
      throw error;
    }
  }
  
  // 辅助方法：随机调整价格
  randomizePrice(price) {
    const change = (Math.random() - 0.5) * price * 0.02; // 最大±2%的变化
    return parseFloat((price + change).toFixed(2));
  }
  
  // 辅助方法：计算涨跌额
  calculateChange(currentPrice, previousPrice) {
    return parseFloat((currentPrice - previousPrice).toFixed(2));
  }
  
  // 辅助方法：计算涨跌幅
  calculateChangePercent(change, previousPrice) {
    return parseFloat(((change / previousPrice) * 100).toFixed(2));
  }
}

module.exports = new StockDataService();
