import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NoMatch from './pages/NoMatch/NoMatch'

import Home from "./pages/Home/Home";
import { Provider } from 'react-redux';
import store from './utils/store';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                {/* <Route exact path="/profile" component={Profile} /> */}
                {/* <Route exact path="/thought" component={SingleThought} /> */}
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
