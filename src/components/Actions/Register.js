import React, { Component } from 'react';


const Register = () => {
  return (
    <div className="register form-component">
      <form className="register__form form">
        <h2 className="form__header">Create your account</h2>
        <label className="form__label" for="user">Username</label>
        <input className="form__input" id="user" type="text"></input>
        <label className="form__label" for="email">Email</label>
        <input className="form__input" id="email" type="email"></input>
        <label className="form__label" for="password">Password</label>
        <input className="form__input" id="password" type="password"></input>
        <label className="form__label label--file" for="file">Upload</label>
        <input className="form__input input--file" type="file" id="file"></input>
        <input className="form__input input--submit" type="submit" value="Create account"></input>
      </form>
    </div>
  );
}

export default Register;
