const APIUtil = require('./api_util.js');

class UsersSearch {
  constructor ($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find(".users");
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput () {
    APIUtil.searchUsers(this.$input.val(), this.renderResults );
    console.log("hi");
  }

  renderResults (usernames) {
    console.log(usernames);
  }
}

module.exports = UsersSearch;
