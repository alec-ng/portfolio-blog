import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import AuthUserContext from './context';

const withAuthorization = condition => Component =>  {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push('/login');
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => condition(authUser) 
            ? <Component {...this.props} /> 
            : null}
        </AuthUserContext.Consumer>
      );   
    }

  }
  let enhanced = withRouter(WithAuthorization);
  return withFirebase(enhanced);
}
export default withAuthorization;