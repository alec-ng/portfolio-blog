import React from 'react';
import { withAuthorization } from '../components/session';

/**
 * Page level component for admin section
 */
const Admin = () => (
  <div>
    Admin Page
  </div>
)

const condition = authUser => authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);