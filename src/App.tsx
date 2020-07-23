import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Route } from 'react-router-dom';
import IngredientListSearch from './containers/ingredientListSearch';
import About from './containers/about';
import AuthContainer from './containers/AuthContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = `Recipe Searcher - ${getPageName(window.location.pathname)}`;
  });

  function getPageName(url: string) {
    switch (url) {
      case '/':
        return 'Home';
      case '/about':
        return 'About';
      case '/login':
        return 'Log in';
      case '/register':
        return 'Register';
      default:
        return '?';
    }
  }

  function showRightSideNav() {
    if (user) {
      return <Nav.Link href="/profile">Profile</Nav.Link>;
    }

    if (!user && window.location.pathname === '/login') {
      return <Nav.Link href="/register">Register</Nav.Link>;
    }

    if (!user && window.location.pathname === '/register') {
      return <Nav.Link href="/login">Log In</Nav.Link>;
    }

    if (!user) {
      return <Nav.Link href="/login">Log In</Nav.Link>;
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Recipe Searcher</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={window.location.pathname} className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {showRightSideNav()}
        </Navbar.Collapse>
      </Navbar>
      <Route
        path="/"
        exact
        render={() => (
          <IngredientListSearch
            ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList}
          />
        )}
      />
      <Route path="/login" exact render={() => <AuthContainer setUser={setUser} />} />
      <Route path="/register" exact render={() => <AuthContainer isNewUser setUser={setUser} />} />
      <Route path="/about" exact render={() => <About />} />
      {/* <footer className="footer">
        <p>© Edwin J. Ramos, 2020</p>
      </footer> */}
    </div>
  );
}
