import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Route } from 'react-router-dom';
import IngredientListSearch from './containers/ingredientListSearch';
import About from './containers/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  function getPageName(url: string) {
    switch (url) {
      case '/':
        return 'Home';
      case '/about':
        return 'About';
      default:
        return '?';
    }
  }

  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  useEffect(() => {
    document.title = `Recipe Searcher - ${getPageName(window.location.pathname)}`;
  });

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Recipe Searcher</Navbar.Brand>
        <Nav activeKey={window.location.pathname} className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
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
      <Route path="/about" exact component={About} />
      <footer className="footer">
        <p>© Edwin J. Ramos, 2020</p>
      </footer>
    </div>
  );
}

export default App;
