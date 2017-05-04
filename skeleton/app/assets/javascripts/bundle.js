/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);

$(() => {
  const $buttons = $('.follow-toggle');
  $buttons.each( (_, button) => {
    new FollowToggle($(button));
  });

  const $searches = $('.users-search');
  const $search = $($searches[0]);
  new UsersSearch($search);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {


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

  searchUsers: (query, success) => {
    return $.ajax( {
      method: 'GET',
      url: '/users/search',
      dataType: 'json',
      data: { query },
      success: success
    });
  }
};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map