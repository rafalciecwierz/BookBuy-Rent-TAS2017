import React, { Component } from 'react';

class NavLink extends Component {
  render() {
    const cssClass = this.props.linkType || ""  ;
    return (
      <a href="#" className="nav-link">
        <i className={`nav-link__icon ${'icon--'+cssClass}`}></i>
      </a>
    );
  }
}

export default NavLink;
