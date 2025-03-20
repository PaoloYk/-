Page({
    data: {
        isLogin: false,
        userInfo: null,
        isChangePasswordPopup: false,
        oldPassword: '',
        newPassword: ''
    },
    onLoad() {
        const app = getApp();
        this.setData({
            isLogin: app.globalData.isLogin,
            userInfo: app.globalData.userInfo
        });
    },
    gotoLogin() {
        wx.navigateTo({
            url: '/pages/login/login'
        });
    },
    gotoRegister() {
        wx.showToast({
            title: '暂未实现注册功能',
            icon: 'none'
        });
    },
    forgetPassword() {
        wx.showToast({
            title: '暂未实现忘记密码功能',
            icon: 'none'
        });
    },
    showChangePasswordPopup() {
        this.setData({
            isChangePasswordPopup: true
        });
    },
    oldPasswordChange(e) {
        this.setData({
            oldPassword: e.detail.value
        });
    },
    newPasswordChange(e) {
        this.setData({
            newPassword: e.detail.value
        });
    },
    doChangePassword() {
        const app = getApp();
        const { userInfo, oldPassword, newPassword } = this.data;
        if (oldPassword!== userInfo.password) {
            wx.showToast({
                title: '旧密码错误',
                icon: 'none'
            });
            return;
        }
        if (newPassword.length < 6) {
            wx.showToast({
                title: '新密码至少6位',
                icon: 'none'
            });
            return;
        }
        userInfo.password = newPassword;
        const userIndex = app.globalData.userDatabase.findIndex(user => user.name === userInfo.name);
        app.globalData.userDatabase[userIndex] = userInfo;
        wx.setStorageSync('userDatabase', app.globalData.userDatabase);
        wx.showToast({
            title: '密码修改成功',
            icon: 'success'
        });
        this.setData({
            isChangePasswordPopup: false
        });
    },
    closeChangePasswordPopup() {
        this.setData({
            isChangePasswordPopup: false
        });
    },
    logout() {
        const app = getApp();
        app.globalData.isLogin = false;
        app.globalData.userInfo = null;
        this.setData({
            isLogin: false,
            userInfo: null
        });
        wx.navigateTo({
            url: '/pages/login/login'
        });
    }
})
    