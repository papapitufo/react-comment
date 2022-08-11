import React from 'react';
import ReactComment from './ReactComment';
import '../style.css';

const App = () => {
    return (
        <>
          <ReactComment 
            configuration={
                {
                    apiUrl: null,//"https://comments.free.beeceptor.com",
                    placeholder: "",
                    areCommentsExpanded: true,
                    showCount: true,
                    showEditorButton: false,
                    editorRows: undefined,
                    enableRichText: false,
                    social: []
                }
            }
          />
        </>
    )
}
export default App;