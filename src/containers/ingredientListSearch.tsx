import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function IngredientListSearch() {
  // state hooks and functions
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ingredientsList, setIngredientsList] = useState<Array<string>>([]);
  const { addToast } = useToasts();

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    setSearchTerm(e.target.value);
  }

  function sanatizeSearchTerm(term: string) {
    // const newTerm = plural(term);
    const capitalizedTerm = term.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return capitalizedTerm;
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
    } else if (ingredientsList.length === 5) {
      addToast('Only 5 ingredients are allowed for searching!', {
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
        <p>Included Ingredients:</p>
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
    <>
      <Jumbotron fluid>
        <h2>
          Enter some ingredients below to create a list.
        </h2>
        <p>After adding ingredients, submit below to get recipes that use your ingredients.</p>
        <Button variant="primary" type="button">Get Recipes</Button>
      </Jumbotron>
      <div className="ingredient-container">
        <div className="add-container">
          <p>Add an ingredient</p>
          <Form onSubmit={handleIngredientAdd}>
            <Form.Group>
              <Form.Control size="lg" type="text" value={searchTerm} placeholder="Ingredient" onChange={handleSearchTermChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
        <div className="ingredient-list-container" style={{ minHeight: '400px' }}>
          {
            ingredientsList.length === 0
              ? <p>Add some Ingredients to get started!</p>
              : makeIngredientItems()
          }
        </div>
        <div />
      </div>
    </>
  );
}

export default IngredientListSearch;
