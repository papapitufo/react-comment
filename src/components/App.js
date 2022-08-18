import React from 'react';
import ReactComment from './ReactComment';
import '../style.css';

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
                    allowDelete: true
                }
            }
          />
        </>
    )
}
export default App;