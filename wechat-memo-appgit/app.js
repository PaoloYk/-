App({
    globalData: {
        isLogin: false,
        userInfo: null
    },
    onLaunch: function () {
        const userDatabase = wx.getStorageSync('userDatabase');
        if (userDatabase) {
            this.globalData.userDatabase = userDatabase;
        } else {
            this.globalData.userDatabase = [];
        }
    }
})
    