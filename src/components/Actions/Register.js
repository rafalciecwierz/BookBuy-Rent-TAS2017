import React, { Component } from 'react';


class Register extends Component {
  render() {
    return (
      <div className="register">
        <form className="register__form" method="post" action="http://localhost:3001/api/users">
          <h2 className="form__header">Create your account</h2>
          <label className="form__label" for="user">Username</label>
          <input className="form__input" id="user" name="username" type="text"></input>
          <label className="form__label" for="email">Email</label>
          <input className="form__input" id="email" type="email" name="email"></input>
          <label className="form__label" for="password">Password</label>
          <input className="form__input" id="password" type="password" name="password"></input>
          <label className="form__label label--file" for="file">Upload</label>
          <input className="form__input input--file" type="file" id="file"></input>
          <input className="form__input input--submit" type="submit" value="Create account"></input>
        </form>
      </div>
    );
  }
}

export default Register;
