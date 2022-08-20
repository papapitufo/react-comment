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
  const { showCount, editorRows, placeholder, apiUrl, allowDelete, allowEdit } = props.configuration;
  const _store = useRef(CommentStore(apiUrl));
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
  function successLogin(userData) {
    _userData.current = userData;
    setIsDialogOpen(true);
  }
  function onRemoveComment(id) {
    if(confirm("Confirm delete comment") == true) {
      const { onCommentRemoved } = props;
      removeComment(id).then(
        () => {
          fetchComments().then(
            (result) => {
              setComments(result);
              onCommentRemoved?.(id);
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
        fetchComments().then(
          (result) => {
            setComments(result);
          }
        )
      }
    ).catch((exception) => { _editComment.current = null })
  }
  function onEditComment(id) {
    _editComment.current = comments.find(comment => comment.id == id);
    if(_editComment.current) setIsDialogOpen(true);
  }
  function WriteComment() {
    return (
      <div className="comment-social-container">
      <span>write a comment with</span>
      <GoogleSignIn 
        clientId="230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com"
        onSuccessLogin={successLogin}
      />
      <FacebookSignIn 
        appId="1190250085159991"
        onSuccessLogin={successLogin}
      />
      </div>
    )
  }
  useEffect(() => {
    const { configuration, items = [] } = props;
    const api = configuration?.apiUrl;
    if (api) {
      fetchComments().then(
        (result) => {
          setComments(result);
        }
      )
    } else {
      setComments(items);
    }
  }, []);
  const getUserDataPayload = (comment) => {
    const current = _userData.current;
    let picUrl = current?.picture;
    let id = current?.id;
    if(current.platform == 'facebook') picUrl = current?.picture.data.url;
    if(current.platform == 'google') id = current?.sub;
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
    if(comment) {
      const { beforeAddComment, commentTransformer, onCommentAdded } = props;
      setIsDialogOpen(false);
      if(_editComment.current) onUpdateComment(comment);
      const payload = getUserDataPayload(comment);
      if(beforeAddComment) {
        payload = beforeAddComment(payload);
      }
      if(commentTransformer) {
        payload = commentTransformer(payload);
      }     
      if(apiUrl) {
        addComment(payload).then(
          () => {
            fetchComments().then(
              (result) => {
                setComments(result);
                onCommentAdded?.(result);
              }
            )
          }
        ).catch(
          (exception) => {
            console.error(exception);
          }
        )
        
      } else {
        const {email, ...other} = payload;
        setComments([...comments, other]);
        onCommentAdded(other);
      }
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
        allowDelete 
        allowEdit
        userId={userId}        
      />
    </>
  )
}
export default ReactComment;