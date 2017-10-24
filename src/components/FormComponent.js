import React, { Component } from 'react';
import './FormComponent.css';

class FormComponent extends Component {
  render() {
    return (
      <div className="FormComponent">
        <h2>Sign up</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="password" placeholder="Password"/>
          <input type="submit" value="Register"/>
        </form>
      </div>
    );
  }
}

export default FormComponent;
