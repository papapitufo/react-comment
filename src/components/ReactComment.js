import React, { useEffect, useRef, useState } from 'react';
import EditorDialog from './Editor/EditorDialog';
import CommentList from './Comment/CommentList';
import GoogleSignIn from './socialLogin/GoogleSignIn';
import FacebookSignIn from './SocialLogin/FacebookSignIn';
import { Fetcher } from '../DataProvider/Fetcher';

const ReactComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const _userData = useRef(null);
  const { showCount, editorRows, placeholder, apiUrl } = props.configuration;
  function fetchComments() {
    return Fetcher.get(apiUrl);
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
  const dialogDoneclicked = (data) => {
    if(data) {
      const { beforeAddComment, commentTransformer } = props;
      setIsDialogOpen(false);
      let beforeInsertData = data;
      if(beforeAddComment) {
        beforeInsertData = beforeAddComment(beforeInsertData);
      }
      if(commentTransformer) {
        beforeInsertData = commentTransformer(beforeInsertData);
      }
      const current = _userData.current;
      const payload = {
        comment: beforeInsertData,
        name: current.name,
        picture: current.picture,
        email: current.email
      }
      console.log(payload);
      if(apiUrl) {
        Fetcher.post(`${apiUrl}/comment`, payload).then(
          () => {
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
        
      } else {
        const {email, ...other} = payload;
        setComments([...comments, other]);
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
      <CommentList comments={comments}/>
    </>
  )
}
export default ReactComment;