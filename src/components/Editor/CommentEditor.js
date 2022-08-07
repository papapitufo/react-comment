import React from 'react';
import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import GoogleSignIn from '../socialLogin/GoogleSignIn';
import FacebookSignIn from '../SocialLogin/FacebookSignIn';
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
  const { rows = 2, containerStyle, customTheme, placeholder, onSubmitComment } = props;
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
    const onSubmitClicked = () => {
      const state = editor.getEditorState();
      state.read(() => {
        const root = $getRoot();
        const text = root.getTextContent();
        if(text) {
          props.onSubmitComment(text);
        }
      })
    }
    return (
      <div>
        <GoogleSignIn clientId="230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com"/>
        <FacebookSignIn appId="1190250085159991"/>
      </div>
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