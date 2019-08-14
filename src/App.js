import React from 'react';
import Login from './components/Login';
// import Auth from './components/Auth';
import Products from './components/Products';
import Cart from './components/Cart';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth'

class App extends React.Component {

  render(){
    return (
      <Router>
        {/* <div className="App"> */}
        <Switch>
          <Route exact={true} path="/" render={() => <Products/> }/>
          <Route exact={true} path="/Login" render={() => <Login/> }/>
          <Route exact={true} path="/Products" render={() => <Products/> }/>
          <Auth>
            <Route exact={true} path="/Cart" render={() => <Cart/> }/>
          </Auth>
        </Switch>
        {/* </div> */}
      </Router>
    );
  }

}

export default App;
