import React, { useEffect, useState } from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
const style = {}

const createLoadFBScript = () => {
  return new Promise((resolve, reject) => {
    const fbScript = document.createElement('script');
    fbScript.id = "facebook-jssdk";
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js"
    fbScript.onload = () => {
      resolve(true);
    };
    try {
      document.querySelector('body').appendChild(fbScript);
    } catch(e) {
      reject(e);
    }
  });
}

let sdkIsReadyPromise;

const getFBSDK = async () => {
  if (!sdkIsReadyPromise) {
    // ok there is no script, let's create it and await it
    sdkIsReadyPromise = createLoadFBScript();
  }
  await sdkIsReadyPromise;
  return window.FB;
}

const FacebookSignIn = (props) => {
  const [loginStatus, setLoginStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  const { onSuccessLogin, onErrorLogin, appId, customClass="" } = props;
  useEffect(() => {
    async function init() {
      // get facebook sdk
      const sdk = await getFBSDK();
      sdk.init({  
        appId,
        cookie: true,
        xfbml: true,
        version: 'v14.0'
      });
      sdk.getLoginStatus((response) => {
        setLoginStatus(response);
      })
    }
    init();
    
  }, []);
  const fetchUserInfo = (userID) => {
    FB.api(`/${userID}/?fields=id,name,email,picture`, 'GET', {}, (result) => {
      result["platform"] = "facebook";
      onSuccessLogin?.(result);
      setUserData(result);
    })
  } 
  const handleFacebookLogin = (response) => {
    const { status } = response;
    if(status == "unknown") {
      onErrorLogin?.(response);
    } else if(status == "connected"){
      const { userID } = response.authResponse;
      fetchUserInfo(userID);
    } else {
      console.log("else", response);
    }
  }
  const onFacebookLoginClick = () => {
    if(userData) onSuccessLogin(userData);
    const { status, authResponse} = loginStatus;
    if(status == 'connected') {
      fetchUserInfo(authResponse.userID);
      return;
    }
    FB.login(handleFacebookLogin, {scope: 'public_profile,email'});
  }
  return (<span className={`comment-social-icon ${customClass}`}><FacebookOutlinedIcon style={style.button} onClick={onFacebookLoginClick}/></span>)
}
export default FacebookSignIn;