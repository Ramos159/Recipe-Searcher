import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ConfirmModal from '../components/confirmModal';

type Props = {
  ingredientsList: string[];
  setIngredientsList: (arr: string[]) => void;
};

function IngredientListSearch({ ingredientsList, setIngredientsList }: Props) {
  // state hooks and functions
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showConfirmModal, setConfirmModal] = useState<boolean>(false);
  const { addToast } = useToasts();

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    setSearchTerm(e.target.value);
  }

  function sanatizeSearchTerm(term: string) {
    // string doesnt contain numbers or weird letters
    if (/^([a-z]+\s)*[a-z]+$/.test(term)) {
      return term;
    }
    throw new Error();
  }

  function makeStringFancy(string: string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // need to find the approriate typing for this event
  function handleIngredientAdd(e: any) {
    e.preventDefault();

    let term = searchTerm.toLowerCase();
    setSearchTerm('');

    const newIngredientsList = ingredientsList;

    try {
      term = sanatizeSearchTerm(term);
    } catch (error) {
      addToast('Please use plain letters in ingredient names! 😡', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    if (ingredientsList.includes(term)) {
      addToast('No Duplicate Ingredients! 😡', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (ingredientsList.length === 5) {
      addToast(
        `Couldn't add ${makeStringFancy(term)}. Only 5 ingredients are allowed for searching! 😕`,
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    } else {
      newIngredientsList.push(term);

      try {
        setIngredientsList(newIngredientsList);
        addToast(`${makeStringFancy(term)} added! 😄`, {
          appearance: 'success',
          autoDismiss: true,
        });
      } catch (error) {
        addToast(`${makeStringFancy(term)} could not be added! 😰`, {
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
          {
            // eslint-disable-next-line react/prop-types
            ingredientsList.map((name, index) => (
              // why are array indexs bad?
              // eslint-disable-next-line react/no-array-index-key
              <ListGroup.Item key={index} variant="info">
                {makeStringFancy(name)}
                <button
                  style={{ float: 'right' }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteIngredientFromList(name);
                  }}
                >
                  Delete
                </button>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </>
    );
  }

  function closeConfirmModal() {
    // eslint-disable-next-line no-console
    console.log('used onclose()');
    setConfirmModal(false);
  }

  function confirmConfirmModal() {
    // eslint-disable-next-line no-console
    console.log('do some confirming magic');
    setConfirmModal(false);
  }

  function validateGetRecipesButton() {
    if (ingredientsList.length > 0) {
      setConfirmModal(true);
    } else {
      addToast('Your included ingredients list is empty. 🤨', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  return (
    <>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={closeConfirmModal}
        onConfirm={confirmConfirmModal}
        title="Confirming Ingredients"
        body="Be sure all your ingredients are spelled correctly and are actual food ingredients. Don't mess around on my app 🤨"
      />
      <Jumbotron fluid>
        <h2>Enter some ingredients below to create a list.</h2>
        <p>After adding ingredients, submit below to get recipes that use your ingredients.</p>
        <Button variant="primary" type="button" onClick={validateGetRecipesButton}>
          Get Recipes
        </Button>
      </Jumbotron>
      <div className="ingredient-container">
        <div className="add-container">
          <p>Add an ingredient</p>
          <Form onSubmit={handleIngredientAdd}>
            <Form.Group>
              <Form.Control
                size="lg"
                type="text"
                value={searchTerm}
                placeholder="Ingredient"
                onChange={handleSearchTermChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="ingredient-list-container" style={{ minHeight: '350px' }}>
          {ingredientsList.length === 0 ? (
            <p>Add some Ingredients to get started!</p>
          ) : (
            makeIngredientItems()
          )}
        </div>
        <div />
      </div>
    </>
  );
}

export default IngredientListSearch;
