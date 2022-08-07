import React, { useEffect, useState } from 'react';
import CommentEditor from './Editor/CommentEditor';
import EditorDialog from './Editor/EditorDialog';
import { Fetcher } from '../DataProvider/Fetcher';

let _api = null;
const ReactComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(!props.configuration.showEditorButton);
  const { showCount, showEditorButton, placeholder, editorRows } = props.configuration;
  function fetchComments() {
    return Fetcher.get(_api);
  }
  useEffect(() => {
    const { configuration, items = [] } = props;
    _api = configuration?.apiUrl;
    if (_api) {
      fetchComments().then(
        (result) => {
          setComments(result);
        }
      )
    } else {
      setComments(items);
    }
  }, []);
  const submitComment = (text) => {
    console.log("plaintext comment", text);
    setIsDialogOpen(true);
  }
  console.log("comments", comments);
  return (
    <>
      {
        showCount && (
        <div className="react-comments-count">{`${comments.length} Comments`}</div>
        )
      }
      {
      showEditorButton &&
      <input 
        className="react-comments-write-comment" 
        type="button" 
        value="write comment" 
        onClick={setShowEditor.bind(null, !showEditor)} 
      />
      }
      {
        showEditor && (<>
          <CommentEditor placeholder={placeholder} rows={editorRows} onSubmitComment={submitComment}/>
        </>)
      }
      <EditorDialog open={isDialogOpen}/>
    </>
  )
}
export default ReactComment;