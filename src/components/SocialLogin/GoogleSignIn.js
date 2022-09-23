import React, { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import "./style.css";

let _userData = null;
const GoogleSignIn = (props) => {
  const { clientId, customClass="", onSuccessLogin, onErrorLogin, icon } = props;
  useEffect(() => {
    if(!clientId) throw new Error('Google ClientId needed');
    if(!_userData) {
    const init = () => {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("googleLoginElement"),
        { type: "icon", size: "medium" }
      );
    }
    try {
      const script = document.createElement('script');
      script.id = "GoogleGsiClientScript"
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = init;
      document.querySelector('body').appendChild(script);
    } catch (exception) {
      onErrorLogin?.(exception);
    }
  }

    return () => {
      document.getElementById("GoogleGsiClientScript")?.remove()
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const [header, payload, signature] = response.credential.split(".");
    //We are not securely parsing this token, we need to also verify it
    const data = JSON.parse(window.atob(payload));
    data["platform"] = "google";
    _userData = data;
    onSuccessLogin?.(_userData); //we want to return data a little massaged here
  }
  const dynamicButtonRender = () => {
    if(_userData) {
      return (
          <GoogleIcon className={`comment-social-icon ${customClass}`} onClick={onSuccessLogin.bind(null, _userData)}/>
        )
    }
    return <span id="googleLoginElement" className={customClass}></span>
  }
  return (
    dynamicButtonRender()
  )
}
export default GoogleSignIn;