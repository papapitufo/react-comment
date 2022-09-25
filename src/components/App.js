import React from 'react';
import ReactComment from './Comment/ReactComment';

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
            showCount: true,
            editorRows: undefined,
            facebookClientId: "<key>",
            googleClientId: "<key>",
            allowDelete: true,
            allowEdit: true,
            allowReply: true,
            commentModel: null, //extends Model and overrides painter() if needed.
            writeCommentPrompt:"Choose an identity to write a comment: "
          }
        }
        onCommentAdded={commentAdded}
        onCommentUpdated={commentUpdated}
        onCommentRemoved={commentRemoved}        
      />
    </>
  )
}
export default App;