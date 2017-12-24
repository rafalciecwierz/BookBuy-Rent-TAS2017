import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './HomeContainer';
import UserPage from './UserPage';
import BookOverviewContainer from './BookOverviewContainer';
import RegisterContainer from './RegisterContainer';
import Login from '../components/Actions/Login';
import Admin from '../components/Users/Admin';

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
          <Route exact path='/admin' component={Admin}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
