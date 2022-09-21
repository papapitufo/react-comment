"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lexical = require("lexical");

var _LexicalComposer = require("@lexical/react/LexicalComposer");

var _LexicalRichTextPlugin = require("@lexical/react/LexicalRichTextPlugin");

var _LexicalContentEditable = require("@lexical/react/LexicalContentEditable");

var _LexicalHistoryPlugin = require("@lexical/react/LexicalHistoryPlugin");

var _LexicalComposerContext = require("@lexical/react/LexicalComposerContext");

var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));

var _Button = _interopRequireDefault(require("@mui/material/Button"));

require("./CommentEditorStyle.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

var defaultTheme = {
  paragraph: "comment-paragraph"
};

function CommentEditor(props) {
  var _props$rows = props.rows,
      rows = _props$rows === void 0 ? 2 : _props$rows,
      containerStyle = props.containerStyle,
      customTheme = props.customTheme,
      placeholder = props.placeholder,
      onSubmitComment = props.onSubmitComment,
      onCancelComment = props.onCancelComment;
  var containerRows = "".concat(rows * 23, "px");
  var styles = {
    contentEditable: _objectSpread({
      minHeight: containerRows,
      padding: ".4em",
      outline: "none",
      borderBottomLeftRadius: "5px",
      borderTopRightRadius: "5px",
      fontFamily: "sans-serif",
      opacity: "0.8",
      marginTop: "5px",
      marginBottom: "5px",
      border: "0.1em solid lightblue"
    }, containerStyle),
    saveButton: {
      height: "22px",
      width: "22px",
      cursor: "pointer"
    },
    placeholder: {
      opacity: 0.6
    }
  };

  var theme = _objectSpread(_objectSpread({}, defaultTheme), customTheme);

  var initialConfig = {
    namespace: 'CommentsEditor',
    onError: onError,
    theme: theme
  };

  function ButtonActionsPlugin() {
    var _useLexicalComposerCo = (0, _LexicalComposerContext.useLexicalComposerContext)(),
        _useLexicalComposerCo2 = _slicedToArray(_useLexicalComposerCo, 1),
        editor = _useLexicalComposerCo2[0];

    var comment = props.comment;

    if (comment) {
      editor.update(function () {
        var root = (0, _lexical.$getRoot)();
        var paragraphNode = (0, _lexical.$createParagraphNode)();
        var textNode = (0, _lexical.$createTextNode)(comment.comment);
        paragraphNode.append(textNode);
        root.append(paragraphNode);
      });
    }

    var actionClicked = function actionClicked(isSubmit) {
      if (isSubmit) {
        var state = editor.getEditorState();
        state.read(function () {
          var root = (0, _lexical.$getRoot)();
          var text = root.getTextContent();

          if (text) {
            onSubmitComment(text);
          }
        });
      } else {
        onCancelComment();
      }
    };

    return /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      onClick: actionClicked.bind(null, false)
    }, "Cancel"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      onClick: actionClicked.bind(null, true)
    }, "Done"));
  }

  return /*#__PURE__*/_react["default"].createElement(_LexicalComposer.LexicalComposer, {
    initialConfig: initialConfig
  }, /*#__PURE__*/_react["default"].createElement(_LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/_react["default"].createElement(_LexicalContentEditable.ContentEditable, {
      style: styles.contentEditable
    }),
    placeholder: /*#__PURE__*/_react["default"].createElement("div", {
      style: styles.placeholder
    }, placeholder !== null && placeholder !== void 0 ? placeholder : "Write a comment")
  }), /*#__PURE__*/_react["default"].createElement(_LexicalHistoryPlugin.HistoryPlugin, null), /*#__PURE__*/_react["default"].createElement(ButtonActionsPlugin, null));
}

var _default = CommentEditor;
exports["default"] = _default;