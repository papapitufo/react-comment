import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentEditor from './CommentEditor';
import "./CommentEditorStyle.css";

export default function EditorDialog(props) {
  const { open = false, onCancelComment, onSubmitComment, rows, placeholder, userData, comment } = props;
  const picUrl = userData?.picture;
  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth="sm">
        <DialogTitle style={{paddingBottom: "6px"}}>
          <div className="editor-dialog-title">
            <img referrerPolicy="no-referrer" src={picUrl} />
            <span>{userData?.name}</span>
          </div>
        </DialogTitle>
        <DialogContent>
          <CommentEditor 
            placeholder={placeholder} 
            rows={rows} 
            comment={comment}
            onSubmitComment={onSubmitComment} 
            onCancelComment={onCancelComment}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
