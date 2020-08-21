import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Route } from 'react-router-dom';
import IngredientListSearch from './containers/IngredientListSearch';
import About from './containers/About';
import AuthContainer from './containers/AuthContainer';
import SearchResults from './containers/SearchResults';
import RecipePage from './containers/RecipePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [user, setUser] = useState<User>(null);

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
      <Route path="/" exact render={() => <IngredientListSearch />} />
      <Route path="/login" exact render={() => <AuthContainer setUser={setUser} />} />
      <Route path="/register" exact render={() => <AuthContainer isNewUser setUser={setUser} />} />
      <Route path="/about" exact render={() => <About />} />
      <Route
        path="/recipeSearch/ingredients=:query"
        exact
        render={({ match }) => <SearchResults query={match.params.query} />}
      />
      <Route
        path="/recipe/:query"
        exact
        render={({ match }) => <RecipePage recipeID={match.params.query} />}
      />
      {/* <footer className="footer">
        <p>© Edwin J. Ramos, 2020</p>
      </footer> */}
    </div>
  );
}
