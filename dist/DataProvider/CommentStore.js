"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Fetcher = require("./Fetcher");

var CommentStore = function CommentStore(api) {
  //when api == null, we want to return a store object that users can tap into
  //to do store.all(), store.add(), store.remove(), store.edit(), 
  //store.listen('add/remove/update', callback) <= returns an id, store.unlisten('listenerId')
  if (!api) throw new Error("(configuration.)apiUrl is needed for CommentStore to work");
  return {
    all: function all() {
      return _Fetcher.Fetcher.get(api);
    },
    add: function add(payload) {
      return _Fetcher.Fetcher.post(api, payload);
    },
    remove: function remove(id) {
      return _Fetcher.Fetcher["delete"]("".concat(api, "/").concat(id));
    },
    edit: function edit(id, payload) {
      return _Fetcher.Fetcher.patch("".concat(api, "/").concat(id), payload);
    }
  };
};

var _default = CommentStore;
exports["default"] = _default;