import React, { useEffect, useRef, useState } from 'react';
import EditorDialog from '../Editor/EditorDialog';
import CommentList from './CommentList';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { FacebookSignIn, GoogleSignIn } from 'social-login-react';
import CommentStore from '../../DataProvider/CommentStore';
import 'social-login-react/dist/styles.css';

const ReactComment = (props) => {
  const [comments, setComments] = useState((() => {
    if(!props.apiUrl && props.comments) return comments;
    return []
  })());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [identity, setIdentity] = useState(null);
  const _editComment = useRef(null);
  const _replyParentId = useRef(null);
  const { showCount, editorRows, placeholder, apiUrl, allowDelete, allowEdit, allowReply, commentModel, commentStore } = props.configuration || {};
  const _store = useRef(commentStore?.() || CommentStore(apiUrl));
  function fetchComments() {
    return _store.current.all();
  }
  function addComment(payload) {
    return _store.current.add(payload);
  }
  function removeComment(id) {
    return _store.current.remove(id);
  }
  function updateComment(id, payload) {
    return _store.current.edit(id, payload);
  }
  function CommentsCount() {
    return showCount && <div className="react-comments-count">{`${comments.length} comments`}</div>
  }
  function onRemoveComment(id) {
    if (confirm("Confirm delete comment") == true) {
      const { onCommentRemoved } = props;
      removeComment(id).then(
        () => {
          onCommentRemoved?.(id);
          fetchComments().then(
            (result) => {
              setComments(result);              
            }
          )
        }
      )
    }
  }
  function setCommentForUpdate(text) {
    const { onCommentUpdated } = props;
    updateComment(_editComment.current.id, { comment: text }).then(
      () => {        
        onCommentUpdated?.({_editComment, text});
        _editComment.current = null;
        fetchComments().then(
          (result) => {
            setComments(result);
          }
        )
      }
    ).catch((exception) => {
      console.log(exception);
      _editComment.current = null
    })
  }
  function setCommentForReply(comment) {
    const payload = getUserDataPayload(comment);
    addComment(payload).then(
      () => {
        _replyParentId.current = null;
        fetchComments().then(
          (result) => {
            setComments(result);
          }
        )
      }
    ).catch(
      (exception) => {
        _replyParentId.current = null;
        console.error(exception);
      }
    )
  }
  function onEditComment(id) {
    _editComment.current = comments.find(comment => comment.id == id);
    if (_editComment.current) setIsDialogOpen(true);
  }
  function IdentityProvider(props) {
    if(identity) return;
    const { facebookClientId, googleSignInConfig, writeCommentPrompt } = props.configuration;
    const { googleClientId, authorizationRequest } = googleSignInConfig;
    return (
      <div className="comment-social-container">
        <span>{writeCommentPrompt}</span>
        {
          googleClientId &&
          <GoogleSignIn
            clientId={googleClientId}
            onSuccessLogin={(data) => {
              props.onIdentityObtained({ id: data.sub, ...data})
            }}
            authorizationRequest={authorizationRequest}
          />
        }
        {
          facebookClientId &&
          <FacebookSignIn
            clientId={facebookClientId}
            onSuccessLogin={(data) => {
              props.onIdentityObtained({ picture: data.picture.data.url, ...data})
            }}
          />
        }
      </div>
    )
  }
  function WriteAComment() {
    if(identity) {
      return (
        <Button 
         variant="contained" 
         startIcon={<AddCommentIcon />} 
         size="small"
         onClick={setIsDialogOpen.bind(null, true)}>
          comment
        </Button>
      )
    }
  }
  useEffect(() => {
    fetchComments().then(
      (result) => {
        setComments(result);
      }
    )
  }, []);
  const getUserDataPayload = (comment) => {
    let picUrl = identity?.picture;
    let id = identity?.id;
    return {
      userId: id,
      comment: comment,
      name: identity.name,
      picture: picUrl,
      email: identity.email,
      createdAt: new Date(),
      parentId: _replyParentId.current
    }
  }
  const dialogDoneclicked = (comment) => {
    if (comment) {
      const { onCommentAdded } = props;
      setIsDialogOpen(false);
      //_editComments indicates that the dialog was closed with the intention of 
      //editing an exisitng post
      if (_editComment.current) {
        setCommentForUpdate(comment);
        return;
      }
      if (_replyParentId.current) {
        setCommentForReply(comment);
        return;
      }
      const payload = getUserDataPayload(comment);
      addComment(payload).then(
        () => {
          onCommentAdded?.(payload);
          fetchComments().then(
            (result) => {
              setComments(result);              
            }
          )
        }
      ).catch(
        (exception) => {
          console.error(exception);
        }
      )
    }
  }
  const replyCommentClicked = (parentId) => {
    _replyParentId.current = parentId;
    setIsDialogOpen(true);
  }
  const clearDialogTransitoryDataAndClose = () => {
    _editComment.current = null; 
    _replyParentId.current = null;
    setIsDialogOpen(false);
  }

  return (
    <>
      <CommentsCount />
      {
        props.configuration.IdentityProvider 
        ? <props.configuration.IdentityProvider onIdentityObtained={setIdentity} />
        : <IdentityProvider onIdentityObtained={setIdentity} configuration={props.configuration}/>
      }      
      <WriteAComment />
      <EditorDialog
        open={isDialogOpen}
        rows={editorRows}
        placeholder={placeholder}
        onCancelComment={clearDialogTransitoryDataAndClose}
        onSubmitComment={dialogDoneclicked}
        userData={identity}
        comment={_editComment.current}
      />
      <CommentList
        comments={comments}
        onRemoveComment={onRemoveComment}
        onEditComment={onEditComment}
        allowDelete={allowDelete}
        allowEdit={allowEdit}
        allowReply={allowReply}
        onReplyCommentClicked={replyCommentClicked}
        userId={identity?.id}
        commentModel={commentModel}
      />
    </>
  )
}
export default ReactComment;