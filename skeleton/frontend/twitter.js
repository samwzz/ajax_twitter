const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(() => {
  const $buttons = $('.follow-toggle');
  $buttons.each( (_, button) => {
    new FollowToggle($(button));
  });

  const $searches = $('.users-search');
  const $search = $($searches[0]);
  new UsersSearch($search);
});
