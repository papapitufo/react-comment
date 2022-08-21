import React from 'react';
import Model from './Model';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

class CommentModel extends Model {
  constructor(attrs) {
    super(attrs);
  }

  paint(props) {
    const { name, picture, id, comment, createdAt, userId } = this.attributes;
    return (
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            {
              (props.allowDelete && userId == props.userId) &&
              <IconButton edge="end" aria-label="delete" onClick={props.onRemoveComment.bind(null, id)}>
                <DeleteIcon />
              </IconButton>
            }
            {
              (props.allowEdit && userId == props.userId) &&
              <IconButton edge="end" aria-label="delete" onClick={props.onEditComment.bind(null, id)}>
                <EditIcon />
              </IconButton>
            }
          </>
        }
      >
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
}
export default CommentModel;