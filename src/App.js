import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import { createContext, useState } from 'react';
import Admin from './components/Admin/Admin';
import AddBook from './components/AddBook/AddBook';
import ManageBooks from './components/ManageBooks/ManageBooks';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: ''
  });
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/addBook">
            <AddBook />
          </PrivateRoute>
          <PrivateRoute path="/manageBooks">
            <ManageBooks />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Header/>
            <Orders/>
          </PrivateRoute>
          <PrivateRoute path="/book/:id">
            <Header/>
            <Checkout/>
          </PrivateRoute>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
