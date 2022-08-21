import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CommentModel from '../Comment/CommentModel';

const CommentList = (props) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        props.comments.sort((commentA, commentB) => new Date(commentB.createdAt) - new Date(commentA.createdAt))
        .map((_comment) => {
          const model = props.commentModel ? new props.commentModel(_comment) : new CommentModel(_comment);
          return (
            <div key={_comment.id}>
               { model.paint(props) }
              <Divider variant="inset" component="li" />
            </div>
          )
        })
      }
    </List>
  )
}
export default CommentList;