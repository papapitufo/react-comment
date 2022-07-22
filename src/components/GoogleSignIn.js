import React, { useEffect } from 'react';

const GoogleSignIn = (props) => {
  const { clientId, customClass, onSuccessLogin, onErrorLogin } = props;
  useEffect(() => {
    const init = () => {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("googleLoginElement"),
        { theme: "outline", size: "small" }
      );
    }
    try {
      const script = document.createElement('script');
      script.id = "GoogleGsiClientScript"
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = init;
      document.querySelector('body').appendChild(script);
    } catch (exception) {
      onErrorLogin && onErrorLogin(exception);
    }

    return () => {
      google?.accounts.id.cancel()
      document.getElementById("GoogleGsiClientScript")?.remove()
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const [header, payload, signature] = response.credential.split(".");
    //We are not securely parsing this token, we need to also verify it
    onSuccessLogin && onSuccessLogin(JSON.parse(window.atob(payload)));
  }

  return (
    <div id="googleLoginElement" className={customClass}></div>
  )
}
export default GoogleSignIn;