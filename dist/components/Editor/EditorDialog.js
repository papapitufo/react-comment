"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EditorDialog;

var React = _interopRequireWildcard(require("react"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));

var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));

var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));

var _CommentEditor = _interopRequireDefault(require("./CommentEditor"));

require("./CommentEditorStyle.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function EditorDialog(props) {
  var _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      onCancelComment = props.onCancelComment,
      onSubmitComment = props.onSubmitComment,
      rows = props.rows,
      placeholder = props.placeholder,
      userData = props.userData,
      comment = props.comment;
  var picUrl = userData === null || userData === void 0 ? void 0 : userData.picture;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Dialog["default"], {
    open: open,
    fullWidth: true,
    maxWidth: "sm"
  }, /*#__PURE__*/React.createElement(_DialogTitle["default"], {
    style: {
      paddingBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-dialog-title"
  }, /*#__PURE__*/React.createElement("img", {
    referrerPolicy: "no-referrer",
    src: picUrl
  }), /*#__PURE__*/React.createElement("span", null, userData === null || userData === void 0 ? void 0 : userData.name))), /*#__PURE__*/React.createElement(_DialogContent["default"], null, /*#__PURE__*/React.createElement(_CommentEditor["default"], {
    placeholder: placeholder,
    rows: rows,
    comment: comment,
    onSubmitComment: onSubmitComment,
    onCancelComment: onCancelComment
  }))));
}