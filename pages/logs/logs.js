//logs.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js');
const HtmlParser = require('../../html-view/index')
var app=getApp();
Page({
  data: {
    logs: [],
    inputShowed: false,
    inputVal: "",
    questList:[],
    pageNo:0,
    pageSize:5,
    id:''
  },
  onLoad(options) {
    this.setData({
      id:options.id
    })
   /* this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })*/
    this.setData({
      questList:[],
    })
   this.getQuestion(this.data.pageNo,this.data.pageSize,this.data.id)
  },
  getQuestion(pageNo,pageSize,questionType,question_title){
    var that = this;
    let data={}
    if(questionType=='0'){
      data ={pageNo: pageNo, pageSize: pageSize,question_title:question_title};
    }else {
      data ={pageNo: pageNo, pageSize: pageSize,questionType:questionType,question_title:question_title};
    }

    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    api.getQuestion({
      data,
      success:(res)=>{
        that.setData({
          questList:res.data.list,
        })
        wx.hideToast();
      }
    })
  },
  onShow(){

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  bindKeyFirm: function(e) {
    this.getQuestion(this.data.pageNo,this.data.pageSize,this.data.id,e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})
