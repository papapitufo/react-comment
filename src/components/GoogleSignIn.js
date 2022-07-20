import React, { useEffect } from 'react';
import * as jose from 'jose';

const GoogleSignIn = () => {
  useEffect(() => {
    const init = () => {
      google.accounts.id.initialize({
        client_id: "230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("googleLoginElement"),
        { theme: "outline", size: "small" } 
      );
    }
    const script = document.createElement('script');
    script.id = "GoogleGsiClientScript"
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      init();
    }
    document.querySelector('.container').appendChild(script);

    return () => {
      google?.accounts.id.cancel()
      document.getElementById("GoogleGsiClientScript")?.remove()
    }
  },[]);

  const handleCredentialResponse = async (response) => {
    console.log("response", response);
    const { payload, protectedHeader } = await jose.jwtVerify(response.credential, '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');
    console.log("payload", payload);
  }

  return (
    <div id="googleLoginElement"></div>
  )
}
export default GoogleSignIn;