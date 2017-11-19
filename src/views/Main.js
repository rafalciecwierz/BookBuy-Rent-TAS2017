import React, { Component } from 'react';
import 'react-router-modal/css/react-router-modal.css'
import { Switch, Route } from 'react-router-dom'
import { ModalContainer, ModalRoute } from 'react-router-modal';
import Home from './Home';
import UserPage from './UserPage';
import RegisterPage from './RegisterPage';
import Login from '../components/Actions/Login';

class Main extends Component {
  render() {
    return (
      <main className="Main">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/user' component={UserPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
