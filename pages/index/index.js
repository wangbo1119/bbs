//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../../images/banner1.jpg',
      '../../images/banner2.jpg',
      '../../images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    forumList:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){

  },
  onLoad: function () {
    let that = this;
    that.login();
    wx.getStorage({
      key: 'bbsProfile',
      success: function(res) {
        if(!res){

        };
      }
    })
    this.getForum();
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


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getForum(){
    let data ={pageNo: "0", pageSize: "5"};
    api.getForum({
      data,
      success:(res)=>{
        this.setData({
          forumList:res.data.content
        })
    }
    })
  },
  login(){
    let data = {"username":"3f8bbbfaafda4d3e83e06b689d785e52","password":"3f8bbbfaafda4d3e83e06b689d785e52"}
    api.login({
      data,
      success:(res)=>{
        wx.setStorage({
          key:'bbsProfile',
          data:res.data.item
        })
      }
    })
  },
  toList(e){
    wx.navigateTo({
      url:'../logs/logs?id=0',
    })
  }
})
