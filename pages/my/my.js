var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
const api = require('../../utils/api.js');
Page({
  data: {
    tabs: ["登录", "注册"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    show:true,
    username:'',
    useravatar:''
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getStorage({
      key: 'bbsProfile',
      success: function(res) {
        if(res.data.roles[0] == "GUEST"){
          that.setData({
            show:true,
            useravatar:res.data.userName.slice(0,1),
            username:res.data.userName
          })
        }else {
          that.setData({
            show:false,
            useravatar:res.data.userName.slice(0,1),
            username:res.data.userName
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login(e){
    let data = {username:e.detail.value.name,password:e.detail.value.password}
    api.login({
      data,
      success:(res)=>{
        wx.setStorage({
          key:'bbsProfile',
          data:res.data.item
        })
        this.setData({
          show:false,
          useravatar:res.data.item.userName.slice(0,1),
          username:res.data.item.userName
        })
      }
    })
  },
  reg(e){
    let data = {username:e.detail.value.name,password:e.detail.value.password,email:e.detail.value.email,phone:e.detail.value.tel}
    api.newAdmin({
      data,
      success:(res)=>{
        this.setData({
          activeIndex: 0
        })
      }
    })
  },
  logout(){
    wx.clearStorage();
    this.setData({
      show:true,
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});