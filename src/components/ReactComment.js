import React, { useEffect, useState } from 'react';
import EditorDialog from './Editor/EditorDialog';
import GoogleSignIn from './socialLogin/GoogleSignIn';
import FacebookSignIn from './SocialLogin/FacebookSignIn';
import { Fetcher } from '../DataProvider/Fetcher';

let _api = null;
let _userData = null;
const ReactComment = (props) => {
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { showCount, editorRows, placeholder } = props.configuration;
  function fetchComments() {
    return Fetcher.get(_api);
  }
  function CommentsCount() {
    return showCount && <div className="react-comments-count">{`${comments.length} comments`}</div>
  }
  function successLogin(userData) {
    _userData = userData
    setIsDialogOpen(true);
  }
  function WriteComment() {
    return (
      <div className="comment-social-container">
      <span>write a comment with</span>
      <GoogleSignIn 
        clientId="230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com"
        userData={_userData}
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
    _api = configuration?.apiUrl;
    if (_api) {
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
    console.log(data);
    setIsDialogOpen(false)
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
        userData={_userData}
      />
    </>
  )
}
export default ReactComment;