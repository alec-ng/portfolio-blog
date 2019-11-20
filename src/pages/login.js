import React, { useEffect } from "react";
import {withFirebase} from '../components/firebase';
import {withAuthUser} from '../components/session';

/**
 * Page level component for admin section
 */
const BaseLogin = function(props) {

  if (props.authDataFetched && !props.authUser) {
    props.firebase.doSignInWithGoogle();
    return (<h1>Please login to continue.</h1>);
  }
  if (!props.authDataFetched) {
    return (<h1>Loading...</h1>);
  }
  /* Do need to re-direct? */
  return (<h1>Signed in as {props.authUser.email}</h1>)
}

const Login = withAuthUser(withFirebase(BaseLogin));
export default Login;

