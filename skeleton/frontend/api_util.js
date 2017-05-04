
const APIUtil = {
  followUser: id => {
    return APIUtil.changeFollowStatus(id, 'POST');
  },

  unfollowUser: id => {
    return APIUtil.changeFollowStatus(id, 'DELETE');
  },

  changeFollowStatus: (id, method) => {
    return $.ajax( {
      method: method,
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  searchUsers: (query) => {
    return $.ajax( {
      method: 'GET',
      url: '/users/search',
      dataType: 'json',
      data: { query }
    });
  }
};

module.exports = APIUtil;
