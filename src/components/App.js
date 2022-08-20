import React from 'react';
import ReactComment from './Comment/ReactComment';
import '../style.css';

function commentAdded(comment) {
  console.log(comment);
}
function commentRemoved(id) {
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
                    showCount: true,
                    showEditorButton: false,
                    editorRows: undefined,
                    enableRichText: false,
                    social: [],
                    allowDelete: true,
                    allowEdit: true
                }
            }
            onCommentAdded={commentAdded}
            onCommentRemoved={commentRemoved}
          />
        </>
    )
}
export default App;