const apiURL = 'http://47.104.244.32:8100';
let headerData= {

}
headerData['Content-Type']= 'application/json';
headerData['Authorization']='eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzEzNTk5NTcsIm5hbWUiOiJ7XCJpZFwiOjIsXCJuYW1lXCI6XCIzZjhiYmJmYWFmZGE0ZDNlODNlMDZiNjg5ZDc4NWU1MlwiLFwicGFzc3dvcmRcIjpcIiQyYSQxMCRWNjRYeXJxLi5KVTBJenVGSUNWb2ZlRDJ3TlljVEc2VmFsTGExTHYyNzYwYXFEaVdwaWhYNlwiLFwiZW1haWxcIjpcIjEyMzQ1Njc4OTAxQDE2My5jb21cIixcInBob25lXCI6XCIxODYwMDY2MTM1NFwiLFwicm9sZXNcIjpbXCJHVUVTVFwiXX0ifQ.ukGGAAYp6xpMqq7XtGgs_O_JkNVwlKeIePivTC_Fiu4'
let userData ={};
wx.getStorage({
  key: 'key',
  success: function(res) {
    userData = res;
  }
})

if(userData){
  if(userData.token){
    headerData['Authorization']=userData.token;
  }
}

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
const getExplorePlaceList = (params) => {
  wxRequest(params, `${apiURL}/destination/v3/`);
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
  getExplorePlaceList,
  getPlaceInfoByID,
  getPlacePOIByID,
  getTripInfoByID,
  getPlaceTripByID,
  getUserInfoByID,
  getWaypointInfoByID,
  getWaypointReplyByID,
};
