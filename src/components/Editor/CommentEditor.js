import React from 'react';
import {$getRoot, $createParagraphNode, $createTextNode} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import "./CommentEditorStyle.css";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

const defaultTheme = {
  paragraph: "comment-paragraph"
}

function CommentEditor(props) {
  const { rows = 2, containerStyle, customTheme, placeholder, onSubmitComment, onCancelComment } = props;
  const containerRows = `${rows * 23}px`;
  const styles = {
    contentEditable: {
      minHeight: containerRows,
      padding: ".4em",
      outline: "none",
      borderBottomLeftRadius: "5px",
      borderTopRightRadius: "5px",
      fontFamily: "sans-serif",
      opacity: "0.8",
      marginTop: "5px",
      marginBottom: "5px",
      border: "0.1em solid lightblue",
      ...containerStyle
    },
    saveButton: {
      height: "22px",
      width: "22px",
      cursor: "pointer"
    },
    placeholder: {
      opacity: 0.6
    }
  }
  const theme = {...defaultTheme, ...customTheme};
  const initialConfig = {
    namespace: 'CommentsEditor',
    onError,
    theme
  };

  function ButtonActionsPlugin() {
    const [editor] = useLexicalComposerContext();
    const { comment } = props;
    if(comment) {
      editor.update(() => {
        const root = $getRoot();
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(comment.comment);
        paragraphNode.append(textNode);
        root.append(paragraphNode);
      })
    }
    const actionClicked = (isSubmit) => {
      if(isSubmit) {
        const state = editor.getEditorState();
        state.read(() => {
          const root = $getRoot();
          const text = root.getTextContent();
          if(text) {
            onSubmitComment(text);
          }
        })
      } else {
        onCancelComment();
      }
    }
    return (
      <DialogActions>
        <Button onClick={actionClicked.bind(null, false)}>Cancel</Button>
        <Button onClick={actionClicked.bind(null, true)}>Done</Button>
      </DialogActions>
    )
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable style={styles.contentEditable}/>}
        placeholder={<div style={styles.placeholder}>{placeholder ?? "Write a comment"}</div>}
      />
      <HistoryPlugin />
      <ButtonActionsPlugin />
    </LexicalComposer>
  );
}
export default CommentEditor;