import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import FacebookSignIn from './FacebookSignIn';
import LinkedInSignIn from './LinkedInSignIn';

const App = (props) => {
    return (
        <>
        <GoogleSignIn />
        <FacebookSignIn />
        <LinkedInSignIn />
        </>
    )
}
export default App;