import React, { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
const style = {
  button: {
    cursor: "pointer",
    height: "28px",
    border: "2px solid black",
    borderRadius: "5px",
    width: "30px",
    marginLeft: "5px",
    cursor: "pointer"
  }
}
const FacebookSignIn = (props) => {
  const [loginStatus, setLoginStatus] = useState(null);
  const { onSuccessLogin, onErrorLogin, appId, customClass="" } = props;
  useEffect(() => {
    const init = () => {
      if(!appId) throw new Error("appId attribute missing");
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v14.0'
      });
      FB.getLoginStatus((response) => {
        console.log('response loign status', response);
        setLoginStatus(response);
      })
    }
    let fbScript = document.getElementById('facebook-jssdk');
    if (!fbScript) {
      fbScript = document.createElement('script');
      fbScript.id = "facebook-jssdk";
      fbScript.src = "https://connect.facebook.net/en_US/sdk.js"
      fbScript.onload = init;
      document.querySelector('body').appendChild(fbScript);
    }
  }, []);
  const handleFacebookLogin = (response) => {
    const { status } = response;
    if(status == "unknown") {
      onErrorLogin?.(response);
    } else if(status == "connected"){
      const { userID } = response.authResponse;
      FB.api(`/${userID}/?fields=id,name,email,picture`, 'GET', {}, (result) => {
        onSuccessLogin?.(result);
      })
    } else {
      console.log("else", response);
    }
  }
  const onFacebookLoginClick = () => {
    FB.login(handleFacebookLogin, {scope: 'public_profile,email'});
  }
  return (
      <FacebookIcon className={customClass} style={style.button} onClick={onFacebookLoginClick}/>
  )
}
export default FacebookSignIn;