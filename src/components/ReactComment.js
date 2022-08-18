import React, { useEffect, useRef, useState } from 'react';
import EditorDialog from './Editor/EditorDialog';
import CommentList from './Comment/CommentList';
import GoogleSignIn from './SocialLogin/GoogleSignIn';
import FacebookSignIn from './SocialLogin/FacebookSignIn';
import CommentStore from '../DataProvider/CommentStore';

const ReactComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const _userData = useRef(null);  
  const { showCount, editorRows, placeholder, apiUrl, allowDelete } = props.configuration;
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
  function CommentsCount() {
    return showCount && <div className="react-comments-count">{`${comments.length} comments`}</div>
  }
  function successLogin(userData) {
    _userData.current = userData;
    setIsDialogOpen(true);
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
    let picUrl = current.picture;
    let id = _userData.id;
    if(current.platform == 'facebook') picUrl = current.picture.data.url;
    if(current.platform == 'google') id = _userData.sub;
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
                onCommentAdded(result);
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
  return (
    <>
      <CommentsCount />
      <WriteComment />
      <EditorDialog 
        open={isDialogOpen} 
        rows={editorRows} 
        placeholder={placeholder} 
        onCancelComment={() => { setIsDialogOpen(false) }}
        onSubmitComment={dialogDoneclicked}
        userData={_userData.current}
      />
      <CommentList comments={comments} onRemoveComment={removeComment} allowDelete userId={_userData.id}/>
    </>
  )
}
export default ReactComment;