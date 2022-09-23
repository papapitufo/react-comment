"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _List = _interopRequireDefault(require("@mui/material/List"));

var _Divider = _interopRequireDefault(require("@mui/material/Divider"));

var _CommentModel = _interopRequireDefault(require("../Comment/CommentModel"));

var _Reply = _interopRequireDefault(require("@mui/icons-material/Reply"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ReplyComponent(props) {
  var postId = props.id,
      onReplyCommentClicked = props.onReplyCommentClicked,
      isIdentityResolved = props.isIdentityResolved;
  return isIdentityResolved && /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "5px",
      marginBottom: "5px"
    },
    title: "Reply to this comment"
  }, /*#__PURE__*/_react["default"].createElement(_Reply["default"], {
    style: {
      cursor: "pointer"
    },
    fontSize: "small",
    onClick: onReplyCommentClicked.bind(null, postId)
  }));
}

var CommentList = function CommentList(props) {
  var comments = props.comments,
      allowReply = props.allowReply,
      commentModel = props.commentModel,
      userId = props.userId;
  var sorted = comments.sort(function (commentA, commentB) {
    return new Date(commentB.createdAt) - new Date(commentA.createdAt);
  });
  var children = [];
  var parents = allowReply ? [] : sorted;

  var _iterator = _createForOfIteratorHelper(sorted),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var parentId = item.parentId;

      if (parentId) {
        if (children[parentId]) {
          children[parentId].push(item);
        } else {
          children[parentId] = [item];
        }
      } else {
        parents.push(item);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return /*#__PURE__*/_react["default"].createElement(_List["default"], {
    sx: {
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper'
    }
  }, parents.map(function (_comment) {
    var model = commentModel ? new commentModel(_comment) : new _CommentModel["default"](_comment);
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: _comment.id
    }, model.painter(props), /*#__PURE__*/_react["default"].createElement(ReplyComponent, {
      id: _comment.id,
      isIdentityResolved: !!userId,
      onReplyCommentClicked: props.onReplyCommentClicked
    }), /*#__PURE__*/_react["default"].createElement(_List["default"], {
      component: "div",
      disablePadding: true
    }, (children[_comment.id] || []).map(function (_reply) {
      var replyModel = commentModel ? new commentModel(_reply) : new _CommentModel["default"](_reply);
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: _reply.id
      }, replyModel.painter(props));
    })), /*#__PURE__*/_react["default"].createElement(_Divider["default"], {
      variant: "inset",
      component: "li"
    }));
  }));
};

var _default = CommentList;
exports["default"] = _default;