import React, { useEffect } from "react";
import {withFirebase} from '../components/firebase';

/**
 * Page level component for admin section
 */
const BaseLogin = function(props) {

  useEffect(() => {
    props.firebase.doSignInWithGoogle();
  });
  
  return (
    <div>
      <h1>Please Login to Continue</h1>
    </div>
  );
}

const Login = withFirebase(BaseLogin);
export default Login;

