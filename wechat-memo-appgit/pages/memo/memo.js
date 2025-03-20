// wechat-memo-app/pages/memo/memo.js
Page({
  data: {
      memoList: [],
      inputValue: ''
  },
  onLoad() {
      const app = getApp();
      if (app.globalData.isLogin) {
          const user = app.globalData.userInfo;
          this.setData({
              memoList: user.memoList
          });
      }
  },
  inputChange(e) {
      this.setData({
          inputValue: e.detail.value
      });
  },
  addItem() {
      const app = getApp();
      const user = app.globalData.userInfo;
      if (this.data.inputValue) {
          const newItem = {
              content: this.data.inputValue,
              time: new Date().toLocaleString()
          };
          user.memoList.unshift(newItem);
          // 更新全局数据中的用户数据库
          const userIndex = app.globalData.userDatabase.findIndex(u => u.name === user.name);
          app.globalData.userDatabase[userIndex] = user;
          wx.setStorageSync('userDatabase', app.globalData.userDatabase);
          this.setData({
              memoList: user.memoList,
              inputValue: ''
          });
      }
  },
  deleteItem(e) {
      const app = getApp();
      const user = app.globalData.userInfo;
      let index = e.currentTarget.dataset.index;
      user.memoList.splice(index, 1);
      // 更新全局数据中的用户数据库
      const userIndex = app.globalData.userDatabase.findIndex(u => u.name === user.name);
      app.globalData.userDatabase[userIndex] = user;
      wx.setStorageSync('userDatabase', app.globalData.userDatabase);
      this.setData({
          memoList: user.memoList
      });
  }
})