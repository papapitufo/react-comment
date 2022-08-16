import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReadComment from './ReadComment';

const CommentList = (props) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        props.comments.map((_comment) => {
          return (
            <>
              <ReadComment
                comment={_comment}
              />
              <Divider variant="inset" component="li" />
            </>
          )
        })
      }
    </List>
  )
}
export default CommentList;