import React from 'react';
import ReactComment from './Comment/ReactComment';
import '../style.css';

function beforeCommentAdded(payload) {
  return payload;
}
function beforeCommentUpdated(payload) {
  return payload;
}
function commentAdded(comment) {
  console.log(comment);
}
function commentRemoved(id) {
  console.log(id);
}
function commentUpdated(id) {
  console.log(id);
}
const App = () => {
  return (
    <>
      <ReactComment
        configuration={
          {
            apiUrl: "https://62fc5c531e6a530698a54458.mockapi.io/comment",
            placeholder: "",
            areCommentsExpanded: true,
            showCount: false,
            showEditorButton: false,
            editorRows: undefined,
            enableRichText: false,
            facebookClientId: "1190250085159991",
            googleClientId: "230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com",
            allowDelete: true,
            allowEdit: true,
            commentModel: null //extends Model and overrides paint().
          }
        }
        onBeforeAdd={beforeCommentAdded}
        onBeforeEdit={beforeCommentUpdated}
        onCommentAdded={commentAdded}
        onCommentRemoved={commentRemoved}
        onCommentUpdated={commentUpdated}
      />
    </>
  )
}
export default App;