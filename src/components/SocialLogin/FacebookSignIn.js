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
        console.log('response loign status', response);
        setLoginStatus(response.status);
      })
    }
    init();
    
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

  console.log(loginStatus);
  return (<FacebookIcon className={customClass} style={style.button} onClick={onFacebookLoginClick}/>)
}
export default FacebookSignIn;