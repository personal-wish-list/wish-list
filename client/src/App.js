import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoMatch from './pages/NoMatch/NoMatch';
import WishList from './pages/WishList/WishList';
import ShoppingList from './pages/ShoppingList/ShoppingList';
import FriendsList from './pages/FriendsList/FriendsList';

import Home from "./pages/Home/Home";
import { Provider } from 'react-redux';
import store from './utils/store';
import Navbar from './components/Navbar';
import Dashboard from "./pages/Dashboard/Dashboard";


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/wishlist/:id" component={WishList} /> 
                <Route exact path="/shoppinglist" component={ShoppingList} />
                <Route exact path="/friendslist" component={FriendsList} />
                <Route component={NoMatch} />
              </Switch>
          </div>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
