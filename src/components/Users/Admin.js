import React, { Component } from 'react';
import AdminBooks from './AdminBooks'
import AdminOrders from './AdminOrders'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.returnTab = this.returnTab.bind(this);
    this.state = {
      tab: 'books'
    };
  }

  handleTabClick(e) {
    const id = e.target.id;
    this.setState({tab: id})
  }

  returnTab() {
    switch (this.state.tab) {
      case 'books':
        return <AdminBooks />
        break;
      case 'orders':
        return <AdminOrders />
        break;
      default:
        return <AdminBooks />
    }
  }


  render() {
    return (
      <div className="admin">
        <h1 className="admin__header">Admin board</h1>
        <div className="tabs-menu">
          <button className="tabs-menu__tab tab--active" id='books'
                  onClick={this.handleTabClick}>Books</button>
                <button className="tabs-menu__tab" id='orders'
                  onClick={this.handleTabClick}>Orders</button>
        </div>
        { this.returnTab() }
      </div>
    );
  }
}

export default Admin;
