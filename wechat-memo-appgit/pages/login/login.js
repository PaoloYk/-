Page({
  login() {
    const app = getApp();
    const { userDatabase } = app.globalData;
    const { username, password } = this.data;
    const targetUser = userDatabase.find(user => user.name === username && user.password === password);
    if (targetUser) {
        app.globalData.isLogin = true;
        app.globalData.userInfo = targetUser;
        wx.switchTab({
            url: '/pages/personalCenter/personalCenter',
            success: function () {
                const page = getCurrentPages().pop();
                if (page) {
                    page.onLoad();
                }
            }
        });
    } else {
        wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
        });
    }
},
    usernameChange(e) {
        this.setData({
            username: e.detail.value
        });
    },
    passwordChange(e) {
        this.setData({
            password: e.detail.value
        });
    },
    login() {
        const app = getApp();
        const { userDatabase } = app.globalData;
        const { username, password } = this.data;
        const targetUser = userDatabase.find(user => user.name === username && user.password === password);
        if (targetUser) {
            app.globalData.isLogin = true;
            app.globalData.userInfo = targetUser;
            wx.switchTab({
                url: '/pages/personalCenter/personalCenter'
            });
        } else {
            wx.showToast({
                title: '用户名或密码错误',
                icon: 'none'
            });
        }
    },
    gotoRegister() {
        this.setData({
            isRegisterPopup: true
        });
    },
    registerUsernameChange(e) {
        this.setData({
            registerUsername: e.detail.value
        });
    },
    registerPasswordChange(e) {
        this.setData({
            registerPassword: e.detail.value
        });
    },
    registerEmailChange(e) {
        this.setData({
            registerEmail: e.detail.value
        });
    },
    doRegister() {
        const app = getApp();
        const { registerUsername, registerPassword, registerEmail } = this.data;
        if (!registerUsername || !registerPassword || !registerEmail) {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            });
            return;
        }
        if (registerPassword.length < 6) {
            wx.showToast({
                title: '密码至少6位',
                icon: 'none'
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(registerEmail)) {
            wx.showToast({
                title: '请输入有效的邮箱地址',
                icon: 'none'
            });
            return;
        }
        const newUser = {
            name: registerUsername,
            password: registerPassword,
            email: registerEmail,
            memoList: []
        };
        app.globalData.userDatabase.push(newUser);
        wx.setStorageSync('userDatabase', app.globalData.userDatabase);
        app.globalData.isLogin = true;
        app.globalData.userInfo = newUser;
        this.setData({
            isRegisterPopup: false
        });
        wx.switchTab({
            url: '/pages/personalCenter/personalCenter'
        });
    },
    closeRegisterPopup() {
        this.setData({
            isRegisterPopup: false
        });
    },
    forgetPassword() {
        this.setData({
            isForgetPasswordPopup: true
        });
    },
    forgetPasswordEmailChange(e) {
        this.setData({
            forgetPasswordEmail: e.detail.value
        });
    },
    checkEmail() {
        const app = getApp();
        const { forgetPasswordEmail } = this.data;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(forgetPasswordEmail)) {
            wx.showToast({
                title: '请输入有效的邮箱地址',
                icon: 'none'
            });
            return;
        }
        const targetUser = app.globalData.userDatabase.find(user => user.email === forgetPasswordEmail);
        if (targetUser) {
            this.setData({
                canResetPassword: true
            });
        } else {
            wx.showToast({
                title: '邮箱未注册',
                icon: 'none'
            });
        }
    },
    newPasswordChange(e) {
        this.setData({
            newPassword: e.detail.value
        });
    },
    resetPassword() {
        const app = getApp();
        const { forgetPasswordEmail, newPassword } = this.data;
        if (newPassword.length < 6) {
            wx.showToast({
                title: '密码至少6位',
                icon: 'none'
            });
            return;
        }
        const targetUser = app.globalData.userDatabase.find(user => user.email === forgetPasswordEmail);
        if (targetUser) {
            targetUser.password = newPassword;
            wx.setStorageSync('userDatabase', app.globalData.userDatabase);
            wx.showToast({
                title: '密码重置成功',
                icon: 'success'
            });
            this.setData({
                isForgetPasswordPopup: false,
                canResetPassword: false
            });
        }
    },
    closeForgetPasswordPopup() {
        this.setData({
            isForgetPasswordPopup: false,
            canResetPassword: false
        });
    }
})
    