import React from 'react';
import GoogleSignIn from './socialLogin/GoogleSignIn';
import FacebookSignIn from './SocialLogin/FacebookSignIn';

const App = (props) => {
    return (
        <>
        <GoogleSignIn clientId="230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com"/>
        <FacebookSignIn appId="1190250085159991"/>
        </>
    )
}
export default App;