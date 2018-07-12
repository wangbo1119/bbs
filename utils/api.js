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
const getPlaceInfoByID = (params) => {
  wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/`);
};
const getPlacePOIByID = (params) => {
  wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/pois/${params.query.poiType}/`);
};
const getTripInfoByID = (params) => {
  wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/`);
};
const getPlaceTripByID = (params) => {
  wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/trips/`);
};
const getUserInfoByID = (params) => {
  wxRequest(params, `${apiURL}/users/${params.query.userId}/v2`);
};
const getWaypointInfoByID = (params) => {
  wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/`);
};
const getWaypointReplyByID = (params) => {
  wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/replies/`);
};

module.exports = {
  getForum,
  getQuestion,
  login,
  getPlaceInfoByID,
  getPlacePOIByID,
  getTripInfoByID,
  getPlaceTripByID,
  getUserInfoByID,
  getWaypointInfoByID,
  getWaypointReplyByID,
};
