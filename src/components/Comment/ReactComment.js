import React, { useEffect, useRef, useState } from 'react';
import EditorDialog from '../Editor/EditorDialog';
import CommentList from './CommentList';
import GoogleSignIn from '../SocialLogin/GoogleSignIn';
import FacebookSignIn from '../SocialLogin/FacebookSignIn';
import CommentStore from '../../DataProvider/CommentStore';

const ReactComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const _userData = useRef(null);
  const _editComment = useRef(null);
  const { showCount, editorRows, placeholder, apiUrl, allowDelete, allowEdit, commentModel, commentStore } = props.configuration || {};
  const _store = useRef(commentStore?.() || CommentStore(apiUrl));
  async function fetchComments() {
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
  function successLogin(userData) {
    _userData.current = userData;
    setIsDialogOpen(true);
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
  function onUpdateComment(text) {
    updateComment(_editComment.current.id, { comment: text }).then(
      () => {
        _editComment.current = null;
        onCommentUpdated?.({_editComment, text});
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
  function onEditComment(id) {
    _editComment.current = comments.find(comment => comment.id == id);
    if (_editComment.current) setIsDialogOpen(true);
  }
  function WriteComment() {
    const { facebookClientId, googleClientId } = props.configuration;
    return (
      <div className="comment-social-container">
        <span>write a comment with</span>
        {
          googleClientId &&
          <GoogleSignIn
            clientId={googleClientId}
            onSuccessLogin={successLogin}
          />
        }
        {
          facebookClientId &&
          <FacebookSignIn
            appId={facebookClientId}
            onSuccessLogin={successLogin}
          />
        }
      </div>
    )
  }
  useEffect(() => {
    fetchComments().then(
      (result) => {
        setComments(result);
      }
    )
  }, []);
  const getUserDataPayload = (comment) => {
    const current = _userData.current;
    let picUrl = current?.picture;
    let id = current?.id;
    if (current.platform == 'facebook') picUrl = current?.picture.data.url;
    if (current.platform == 'google') id = current?.sub;
    return {
      userId: id,
      comment: comment,
      name: current.name,
      picture: picUrl,
      email: current.email,
      createdAt: new Date()
    }
  }
  const dialogDoneclicked = (comment) => {
    if (comment) {
      const { beforeAddComment, commentTransformer, onCommentAdded } = props;
      setIsDialogOpen(false);
      if (_editComment.current) {
        onUpdateComment(comment);
        return;
      }
      const payload = getUserDataPayload(comment);
      if (beforeAddComment) {
        payload = beforeAddComment(payload);
      }
      if (commentTransformer) {
        payload = commentTransformer(payload);
      }
      addComment(payload).then(
        () => {
          onCommentAdded?.(result);
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
  const userId = _userData.current?.platform == "google" ? _userData.current.sub : _userData.current?.id;
  return (
    <>
      <CommentsCount />
      <WriteComment />
      <EditorDialog
        open={isDialogOpen}
        rows={editorRows}
        placeholder={placeholder}
        onCancelComment={() => { _editComment.current = null; setIsDialogOpen(false) }}
        onSubmitComment={dialogDoneclicked}
        userData={_userData.current}
        comment={_editComment.current}
      />
      <CommentList
        comments={comments}
        onRemoveComment={onRemoveComment}
        onEditComment={onEditComment}
        allowDelete={allowDelete}
        allowEdit={allowEdit}
        userId={userId}
        commentModel={commentModel}
      />
    </>
  )
}
export default ReactComment;