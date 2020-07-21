import React, { useState } from 'react';
import { plural } from 'pluralize';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useToasts } from 'react-toast-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // state hooks and functions
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<Array<string>>([]);
  const { addToast } = useToasts();

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    setSearchTerm(e.target.value);
  }

  function sanatizeSearchTerm(term: string) {
    const newTerm = plural(term);
    const capitalizedNewTerm = newTerm.charAt(0).toUpperCase() + newTerm.slice(1);

    return capitalizedNewTerm;
  }

  // need to find the approriate typing for this event
  function handleIngredientAdd(e: any) {
    e.preventDefault();

    const newIngredientsList = ingredientsList;
    const sanitizedSearchTerm = sanatizeSearchTerm(searchTerm);
    setSearchTerm('');

    if (ingredientsList.includes(sanitizedSearchTerm)) {
      addToast('No Duplicate Ingredients! 😡', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      newIngredientsList.push(sanitizedSearchTerm);

      try {
        setIngredientsList(newIngredientsList);
        addToast('Ingredient added! 😄', {
          appearance: 'success',
          autoDismiss: true,
        });
      } catch (error) {
        addToast('Ingredient could not be added! 😰', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    }
  }

  function deleteIngredientFromList(name: string) {
    const newIngredientsList = ingredientsList.filter((item) => item !== name);
    setIngredientsList(newIngredientsList);
  }

  function makeIngredientItems() {
    return (
      <>
        <h2>Added Ingredients:</h2>
        <ListGroup variant="flush">
          {ingredientsList.map((name, index) => (
            // why are array indexs bad?
            // eslint-disable-next-line react/no-array-index-key
            <ListGroup.Item key={index} variant="info">
              {name}
              <button style={{ float: 'right' }} type="button" className="btn btn-danger" onClick={() => { deleteIngredientFromList(name); }}>
                Delete
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Recipe Searcher</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar>
      <Jumbotron fluid>
        <h2>
          Enter some ingredients below to create a list.
        </h2>
        <p>After adding ingredients, submit below to get recipes that use your ingredients.</p>
        <Button variant="primary" type="button">Get Recipes</Button>
      </Jumbotron>
      <div style={{
        alignItems: 'center', display: 'inline',
      }}
      >
        <div style={{
          width: '50%', paddingLeft: '2.5%', paddingRight: '2.5%', minHeight: '50%', float: 'left',
        }}
        >
          <Form onSubmit={handleIngredientAdd}>
            <Form.Group>
              <Form.Control size="lg" type="text" value={searchTerm} placeholder="Ingredient" onChange={handleSearchTermChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Ingredient</Button>
          </Form>
        </div>
        <div style={{
          width: '50%', borderLeft: '1px solid #D3D3D3', paddingLeft: '2.5%', paddingRight: '2.5%', minHeight: '50%', float: 'right',
        }}
        >
          {ingredientsList.length === 0 ? <h2>Add some ingredients!</h2> : makeIngredientItems()}
        </div>
        <div />
      </div>
      {/* <hr style={{ width: '90%', float: 'right' }} /> */}
      <footer className="footer">
        <p>© Edwin J. Ramos, 2020</p>
      </footer>
    </div>
  );
}

export default App;
