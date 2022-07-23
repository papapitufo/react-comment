import React, { useEffect } from 'react';
const style = {
  button: {
    cursor: "pointer",
    height: "20px",
    border: "1px solid lightgray",
    margin: "0.1em 0em 0.1em 0em",
    borderRadius: "3px",
    padding: "0.1em 0.4em 0.1em 0.4em",
    width: "fit-content"
  }
}
const FacebookSignIn = (props) => {
  const { onSuccessLogin, onErrorLogin, appId, customClass } = props;
  useEffect(() => {
    const init = () => {
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v14.0'
      });
    }
    let fbScript = document.getElementById('facebook-jssdk');
    if (!fbScript) {
      fbScript = document.createElement('script');
      fbScript.id = "facebook-jssdk";
      fbScript.src = "https://connect.facebook.net/en_US/sdk.js"
      fbScript.onload = init;
      document.querySelector('body').appendChild(fbScript);
    }
  }, [])
  const handleFacebookLogin = (response) => {
    if(response.status == "unknown") {
      console.log("error", response);
      onErrorLogin?.(response);
    } else {
      console.log(response);
      const { userID } = response.authResponse;
      FB.api(`/${userID}/?fields=id,name,email,picture`, 'GET', {}, (result) => {
        onSuccessLogin?.(result);
      })
    }
  }
  const onFacebookLoginClick = () => {
    FB.login(handleFacebookLogin, {scope: 'public_profile,email'});
  }
  return (
    <div className={`${customClass || ''}`} style={style.button} onClick={onFacebookLoginClick}>facebook login</div>
  )
}
export default FacebookSignIn;