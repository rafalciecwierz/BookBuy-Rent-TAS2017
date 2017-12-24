import React, { Component } from 'react';
import UserProfile from '../components/Users/UserProfile';

class UserPage extends Component {
  render() {
    return (
      <div className="UserPage">
        <UserProfile />
      </div>
    );
  }
}

export default UserPage;
