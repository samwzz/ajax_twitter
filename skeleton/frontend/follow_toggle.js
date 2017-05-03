const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor ($el) {
    this.$el = $el;
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.render();
    $el.on("click", this.handleClick.bind(this));
  }

  render () {

    switch (this.followState) {
      case "followed":
        this.$el.prop("disabled", false);
        this.$el.text("Unfollow!");
        break;
      case "unfollowed":
        this.$el.prop("disabled", false);
        this.$el.text("Follow!");
        break;
      case "following":
        this.$el.prop("disabled", true);
        this.$el.text("Following");
        break;
      case "unfollowing":
        this.$el.prop("disabled", true);
        this.$el.text("Unfollowing");
        break;
    }

  }

  handleClick (e) {
    e.preventDefault();

    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => {
        this.followState ="unfollowed";
        this.render();
      });
    } else {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(() => {
        this.followState ="followed";
        this.render();
      });
    }
  }
}

module.exports = FollowToggle;
