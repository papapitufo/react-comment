import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReadComment from './ReadComment';

const CommentList = (props) => {
  const { userId, allowDelete, allowEdit, onRemoveComment, onEditComment } = props;
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        props.comments.sort((commentA, commentB) => new Date(commentB.createdAt) - new Date(commentA.createdAt))
        .map((_comment) => {
          if(_comment.name.toLowerCase() == "robi moller")console.log("comment data", {_comment, userId});
          return (
            <div key={_comment.id}>
              <ReadComment
                comment={_comment}
                canDelete={(allowDelete && (userId == _comment.userId))}
                canEdit={allowEdit && (userId == _comment.userId)}
                onRemoveComment={onRemoveComment}
                onEditComment={onEditComment}
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