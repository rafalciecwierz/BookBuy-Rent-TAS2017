import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer';
import UserPage from './UserPage';
import BookOverviewContainer from './BookOverviewContainer';
import RegisterContainer from './RegisterContainer';
import Login from '../components/Actions/Login';
import Logout from '../components/Actions/Logout';
import Admin from '../components/Users/Admin';
import CartPage from './CartPage';

class Main extends Component {
  render() {
    return (
      <main className="Main">
        <Switch>
          <Route exact path='/' component={HomeContainer}/>
          <Route exact path='/user' component={UserPage}/>
          <Route path='/books/:id' component={BookOverviewContainer}/>
          <Route exact path='/register' component={RegisterContainer}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={Logout}/>
          <Route exact path='/admin' component={Admin}/>
          <Route exact path='/cart' component={CartPage}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
