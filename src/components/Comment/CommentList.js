import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReadComment from './ReadComment';

const CommentList = (props) => {
  const { userId, allowDelete, onRemoveComment } = props;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        props.comments.sort((commentA, commentB) => new Date(commentB.createdAt) - new Date(commentA.createdAt))
        .map((_comment) => {
          return (
            <div key={_comment.id}>
              <ReadComment
                comment={_comment}
                canRemove={allowDelete && (userId == _comment.userId)}
                onRemoveComment={onRemoveComment}
              />
              <Divider variant="inset" component="li" />
            </div>
          )
        })
      }
    </List>
  )
}
export default CommentList;