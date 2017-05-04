const APIUtil = require('./api_util.js');

class UsersSearch {
  constructor ($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find(".users");
    this.$input.on("input", this.handleInput.bind(this));
  }

  handleInput () {
    APIUtil.searchUsers(this.$input.val()).then(users => this.renderResults(users));
  }

  renderResults (users) {
    this.$ul.empty();

    users.forEach((user) => {
      const $li = $("<li>");
      $li.html(`<a href="#">${user.username}</a>`);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
