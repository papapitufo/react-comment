import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import FacebookSignIn from './FacebookSignIn';
import LinkedInSignIn from './LinkedInSignIn';

const App = (props) => {
    return (
        <>
        <GoogleSignIn clientId="230467277870-ssce2shtbq5v9mrhr3b0sumru0oh4vfl.apps.googleusercontent.com"/>
        <FacebookSignIn appId="1190250085159991"/>
        <LinkedInSignIn />
        </>
    )
}
export default App;