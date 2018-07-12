const apiURL = 'http://47.104.244.32:8100';
let headerData= {

}
headerData['Content-Type']= 'application/json';
let userData ={};
wx.getStorage({
  key: 'bbsProfile',
  success: function(res) {
    userData = res.data;
      if(userData.token){
        headerData['Authorization']=userData.token;
    }
  }
})


const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'POST',
    data: params.data || {},
    header:headerData, /*{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },*/
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const getForum = (params) => {
  wxRequest(params, `${apiURL}/forumManagement/getForum`);
};
const getQuestion = (params) => {
  wxRequest(params, `${apiURL}/question/getQuestion`);
};
const login = (params) => {
  wxRequest(params, `${apiURL}/session`);
};

module.exports = {
  getForum,
  getQuestion,
  login,
};
