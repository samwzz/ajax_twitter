class FollowToggle {
  constructor ($el) {
    this.$el = $el;
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.render();
    $el.on("click", this.handleClick.bind(this));
  }

  render () {
    this.$el.text(this.followState === "followed" ? "Unfollow!" : "Follow!");
  }

  handleClick (e) {
    e.preventDefault();
    const meth = this.followState === "followed" ? 'delete' : 'post';
    const that = this;
    $.ajax( {
      method: meth,
      url: `/users/${this.userId}/follow`,
      dataType: 'json',
      success: () => {
        this.followState = this.followState === "followed" ? "unfollowed" : "followed";
        this.render();
      }
    });
  }

}

module.exports = FollowToggle;
