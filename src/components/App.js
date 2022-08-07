import React from 'react';
import ReactComment from './ReactComment';

const App = () => {
    return (
        <>
          <ReactComment 
            configuration={
                {
                    apiUrl: null,//"https://comments.free.beeceptor.com",
                    placeholder: "",
                    areCommentsExpanded: true,
                    showCount: false,
                    showEditorButton: false,
                    editorRows: undefined,
                    enableRichText: false
                }
            }
          />
        </>
    )
}
export default App;