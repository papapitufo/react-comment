import React, { useEffect } from 'react';

const GoogleSignIn = (props) => {
  const { clientId, customClass="", onSuccessLogin, onErrorLogin, icon } = props;
  useEffect(() => {
    if(!clientId) throw new Error('Google ClientId needed');
    const init = () => {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("googleLoginElement"),
        { theme: "filled_black", size: "medium", type: "icon" }
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

    return () => {
      document.getElementById("GoogleGsiClientScript")?.remove()
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const [header, payload, signature] = response.credential.split(".");
    //We are not securely parsing this token, we need to also verify it
    onSuccessLogin?.(JSON.parse(window.atob(payload)));
  }

  return (
    <span id="googleLoginElement" className={customClass} style={{float: "left"}}></span>
  )
}
export default GoogleSignIn;