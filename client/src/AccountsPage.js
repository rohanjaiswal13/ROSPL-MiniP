import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import AccountSummary from './components/AccountSummary';


import {Provider} from 'react-redux';
import store from './store';
import { Container} from 'reactstrap';

class AccountsPage extends Component {
  render() {
    return (
      //this allows us to share state accross components
      <Provider store={store}>
        <div className="App">
            <AppNavBar />
            <Container>
              <h1>My Accounts</h1>

              <AccountSummary />
            
            
          </Container>
        </div>
      </Provider>
    );
  }
}

export default AccountsPage;