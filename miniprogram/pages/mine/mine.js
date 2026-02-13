// mine.js
Page({
  data: {
    userInfo: {
      nickName: '',
      id: ''
    }
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    } else {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo: userInfo
        });
        app.globalData.userInfo = userInfo;
      }
    }
  },

  // 处理登录/退出
  handleAuth() {
    const app = getApp();
    if (this.data.userInfo.nickName) {
      // 退出登录
      this.logout();
    } else {
      // 登录
      this.login();
    }
  },

  // 登录
  login() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          nickName: res.userInfo.nickName,
          id: '1000' + Math.floor(Math.random() * 9000)
        };
        
        this.setData({ userInfo });
        
        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo);
        
        // 保存到全局数据
        const app = getApp();
        app.globalData.userInfo = userInfo;
        
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: (error) => {
        console.error('登录失败:', error);
        wx.showToast({ title: '登录失败', icon: 'error' });
      }
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          wx.removeStorageSync('userInfo');
          
          // 清除全局数据
          const app = getApp();
          app.globalData.userInfo = null;
          
          // 重置页面数据
          this.setData({
            userInfo: {
              nickName: '',
              id: ''
            }
          });
          
          wx.showToast({ title: '已退出登录', icon: 'success' });
        }
      }
    });
  },

  // 跳转到我的自选
  goToWatchlist() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  // 跳转到浏览历史
  goToHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  // 跳转到设置
  goToSettings() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  // 跳转到关于我们
  goToAbout() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  // 跳转到意见反馈
  goToFeedback() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  }
});
