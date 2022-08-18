import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ReadComment = (props) => {
  const { name, picture, comment, createdAt="" } = props.comment;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={name} src={picture} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
            {`${(new Date(createdAt)).toLocaleDateString()} - `}
            </Typography>  
            {comment}          
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
export default ReadComment;