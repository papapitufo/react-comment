"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _EditorDialog = _interopRequireDefault(require("../Editor/EditorDialog"));

var _CommentList = _interopRequireDefault(require("./CommentList"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

var _AddComment = _interopRequireDefault(require("@mui/icons-material/AddComment"));

var _GoogleSignIn = _interopRequireDefault(require("../SocialLogin/GoogleSignIn"));

var _FacebookSignIn = _interopRequireDefault(require("../SocialLogin/FacebookSignIn"));

var _CommentStore = _interopRequireDefault(require("../../DataProvider/CommentStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReactComment = function ReactComment(props) {
  var _useState = (0, _react.useState)(function () {
    if (!props.apiUrl && props.comments) return comments;
    return [];
  }()),
      _useState2 = _slicedToArray(_useState, 2),
      comments = _useState2[0],
      setComments = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isDialogOpen = _useState4[0],
      setIsDialogOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      identity = _useState6[0],
      setIdentity = _useState6[1];

  var _editComment = (0, _react.useRef)(null);

  var _replyParentId = (0, _react.useRef)(null);

  var _ref = props.configuration || {},
      showCount = _ref.showCount,
      editorRows = _ref.editorRows,
      placeholder = _ref.placeholder,
      apiUrl = _ref.apiUrl,
      allowDelete = _ref.allowDelete,
      allowEdit = _ref.allowEdit,
      allowReply = _ref.allowReply,
      commentModel = _ref.commentModel,
      commentStore = _ref.commentStore;

  var _store = (0, _react.useRef)((commentStore === null || commentStore === void 0 ? void 0 : commentStore()) || (0, _CommentStore["default"])(apiUrl));

  function fetchComments() {
    return _store.current.all();
  }

  function addComment(payload) {
    return _store.current.add(payload);
  }

  function removeComment(id) {
    return _store.current.remove(id);
  }

  function updateComment(id, payload) {
    return _store.current.edit(id, payload);
  }

  function CommentsCount() {
    return showCount && /*#__PURE__*/_react["default"].createElement("div", {
      className: "react-comments-count"
    }, "".concat(comments.length, " comments"));
  }

  function onRemoveComment(id) {
    if (confirm("Confirm delete comment") == true) {
      var onCommentRemoved = props.onCommentRemoved;
      removeComment(id).then(function () {
        onCommentRemoved === null || onCommentRemoved === void 0 ? void 0 : onCommentRemoved(id);
        fetchComments().then(function (result) {
          setComments(result);
        });
      });
    }
  }

  function setCommentForUpdate(text) {
    var onCommentUpdated = props.onCommentUpdated;
    updateComment(_editComment.current.id, {
      comment: text
    }).then(function () {
      onCommentUpdated === null || onCommentUpdated === void 0 ? void 0 : onCommentUpdated({
        _editComment: _editComment,
        text: text
      });
      _editComment.current = null;
      fetchComments().then(function (result) {
        setComments(result);
      });
    })["catch"](function (exception) {
      console.log(exception);
      _editComment.current = null;
    });
  }

  function setCommentForReply(comment) {
    var payload = getUserDataPayload(comment);
    addComment(payload).then(function () {
      _replyParentId.current = null;
      fetchComments().then(function (result) {
        setComments(result);
      });
    })["catch"](function (exception) {
      _replyParentId.current = null;
      console.error(exception);
    });
  }

  function onEditComment(id) {
    _editComment.current = comments.find(function (comment) {
      return comment.id == id;
    });
    if (_editComment.current) setIsDialogOpen(true);
  }

  function IdentityProvider(props) {
    if (identity) return;
    var _props$configuration = props.configuration,
        facebookClientId = _props$configuration.facebookClientId,
        googleClientId = _props$configuration.googleClientId,
        writeCommentPrompt = _props$configuration.writeCommentPrompt;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "comment-social-container"
    }, /*#__PURE__*/_react["default"].createElement("span", null, writeCommentPrompt), googleClientId && /*#__PURE__*/_react["default"].createElement(_GoogleSignIn["default"], {
      clientId: googleClientId,
      onSuccessLogin: function onSuccessLogin(data) {
        props.onIdentityObtained(_objectSpread({
          id: data.sub
        }, data));
      }
    }), facebookClientId && /*#__PURE__*/_react["default"].createElement(_FacebookSignIn["default"], {
      appId: facebookClientId,
      onSuccessLogin: function onSuccessLogin(data) {
        props.onIdentityObtained(_objectSpread({
          picture: data.picture.data.url
        }, data));
      }
    }));
  }

  function WriteAComment() {
    if (identity) {
      return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "contained",
        startIcon: /*#__PURE__*/_react["default"].createElement(_AddComment["default"], null),
        size: "small",
        onClick: setIsDialogOpen.bind(null, true)
      }, "comment");
    }
  }

  (0, _react.useEffect)(function () {
    fetchComments().then(function (result) {
      setComments(result);
    });
  }, []);

  var getUserDataPayload = function getUserDataPayload(comment) {
    var picUrl = identity === null || identity === void 0 ? void 0 : identity.picture;
    var id = identity === null || identity === void 0 ? void 0 : identity.id;
    return {
      userId: id,
      comment: comment,
      name: identity.name,
      picture: picUrl,
      email: identity.email,
      createdAt: new Date(),
      parentId: _replyParentId.current
    };
  };

  var dialogDoneclicked = function dialogDoneclicked(comment) {
    if (comment) {
      var onCommentAdded = props.onCommentAdded;
      setIsDialogOpen(false); //_editComments indicates that the dialog was closed with the intention of 
      //editing an exisitng post

      if (_editComment.current) {
        setCommentForUpdate(comment);
        return;
      }

      if (_replyParentId.current) {
        setCommentForReply(comment);
        return;
      }

      var payload = getUserDataPayload(comment);
      addComment(payload).then(function () {
        onCommentAdded === null || onCommentAdded === void 0 ? void 0 : onCommentAdded(payload);
        fetchComments().then(function (result) {
          setComments(result);
        });
      })["catch"](function (exception) {
        console.error(exception);
      });
    }
  };

  var replyCommentClicked = function replyCommentClicked(parentId) {
    _replyParentId.current = parentId;
    setIsDialogOpen(true);
  };

  var clearDialogTransitoryDataAndClose = function clearDialogTransitoryDataAndClose() {
    _editComment.current = null;
    _replyParentId.current = null;
    setIsDialogOpen(false);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(CommentsCount, null), /*#__PURE__*/_react["default"].createElement(IdentityProvider, {
    onIdentityObtained: setIdentity,
    configuration: props.configuration
  }), /*#__PURE__*/_react["default"].createElement(WriteAComment, null), /*#__PURE__*/_react["default"].createElement(_EditorDialog["default"], {
    open: isDialogOpen,
    rows: editorRows,
    placeholder: placeholder,
    onCancelComment: clearDialogTransitoryDataAndClose,
    onSubmitComment: dialogDoneclicked,
    userData: identity,
    comment: _editComment.current
  }), /*#__PURE__*/_react["default"].createElement(_CommentList["default"], {
    comments: comments,
    onRemoveComment: onRemoveComment,
    onEditComment: onEditComment,
    allowDelete: allowDelete,
    allowEdit: allowEdit,
    allowReply: allowReply,
    onReplyCommentClicked: replyCommentClicked,
    userId: identity === null || identity === void 0 ? void 0 : identity.id,
    commentModel: commentModel
  }));
};

var _default = ReactComment;
exports["default"] = _default;