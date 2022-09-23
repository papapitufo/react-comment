import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CommentModel from '../Comment/CommentModel';
import ReplyIcon from '@mui/icons-material/Reply';

function ReplyComponent(props) {
  const { id: postId, onReplyCommentClicked, isIdentityResolved } = props;
  return isIdentityResolved &&
    <span
      style={{ display: "flex", justifyContent: "flex-end", marginRight: "5px", marginBottom: "5px" }}
      title="Reply to this comment">
      <ReplyIcon
        style={{ cursor: "pointer" }}
        fontSize="small"
        onClick={onReplyCommentClicked.bind(null, postId)}
      />
    </span>
}
const CommentList = (props) => {
  const { comments, allowReply, commentModel, userId } = props;
  const sorted = comments.sort((commentA, commentB) => new Date(commentB.createdAt) - new Date(commentA.createdAt));
  const children = [];
  const parents = allowReply ? [] : sorted;
  for (const item of sorted) {
    const { parentId } = item;
    if (parentId) {
      if (children[parentId]) {
        children[parentId].push(item);
      } else {
        children[parentId] = [item];
      }
    } else {
      parents.push(item);
    }
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        parents
          .map((_comment) => {
            const model = commentModel ? new commentModel(_comment) : new CommentModel(_comment);
            return (
              <div key={_comment.id}>
                {model.painter(props)}
                <ReplyComponent id={_comment.id} isIdentityResolved={!!userId} onReplyCommentClicked={props.onReplyCommentClicked} />
                  <List component="div" disablePadding>
                    {
                      (children[_comment.id] || []).map((_reply) => {
                        const replyModel = commentModel ? new commentModel(_reply) : new CommentModel(_reply);
                        return (
                          <div key={_reply.id}>
                            {replyModel.painter(props)}
                          </div>
                        )
                      })
                    }
                  </List>
                <Divider variant="inset" component="li" />
              </div>
            )
          })
      }
    </List>
  )
}
export default CommentList;