class FollowToggle {
  constructor ($el) {
    this.$el = $el;
    this.userId = $el.find("data-user-id");
    this.followState = $el.find("data-initial-follow-state");
    this.render();
  }

  render () {
    this.$el.text(this.followState === "followed" ? "Follow!" : "Unfollow!");
  }
}

module.exports = FollowToggle;
