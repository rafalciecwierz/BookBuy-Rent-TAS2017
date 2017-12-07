import React, { Component } from 'react';
import 'react-router-modal/css/react-router-modal.css'
import { Switch, Route } from 'react-router-dom'
import { ModalContainer, ModalRoute } from 'react-router-modal';
import Home from './Home';
import UserPage from './UserPage';
import RegisterPage from './RegisterPage';
import BookPage from './BookPage';
import BookOverview from '../components/Books/BookOverview';
import Login from '../components/Actions/Login';
import Admin from '../components/Users/Admin';

class Main extends Component {
  render() {
    return (
      <main className="Main">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/user' component={UserPage}/>
          <Route path='/books/:id' component={BookPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/admin' component={Admin}/>

        </Switch>
      </main>
    );
  }
}

export default Main;
