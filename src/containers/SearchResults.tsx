import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/modal';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

type Props = {
  query: string;
};

export default function SearchResults({ query }: Props) {
  const [recipes, setRecipes] = useState<RecipeOverview[]>([]);
  const [failureModalVisible, setFailureModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('');
  const { push } = useHistory();

  useEffect(() => {
    async function getRecipes() {
      const results = await makeRecipesFetch();
      return results;
    }
    getRecipes()
      .then((data) => {
        if (data) {
          setRecipes(data);
          setLoading(false);
        } else {
          setLoading(false);
          setModalErrorMessage(
            'Spoonacular probably sent me a 402 status, that means no more API calls for today. Try again later/tomorrow.'
          );
          setFailureModalVisible(true);
        }
      })
      .catch((error) => {
        setModalErrorMessage('There was an error getting your recipes. Try again later.');
        setFailureModalVisible(true);
      });
  }, []);

  function makeQueryString(query: string) {
    const firstPart = 'https://api.spoonacular.com/recipes/complexSearch?includeIngredients=';
    const secondPart = query;
    const thirdPart = '&number=10&ranking=2&apiKey=b75b9796b0754096b534e597ee2e94c9';

    return firstPart + secondPart + thirdPart;
  }

  async function fetchRecipes(query: string) {
    const response = await fetch(query);
    const data = await response.json();

    return data;
  }

  async function makeRecipesFetch() {
    const queryString = makeQueryString(query);
    const recipeResults = await fetchRecipes(queryString);
    return recipeResults.results;
  }

  function handleFailureModalClose() {
    push('/');
  }

  function goToRecipePage(id: number) {
    console.log(`going to recipe page with id: ${id}`);
  }

  function completedRecipeCards() {
    return recipes.map((recipe) => (
      <Card>
        <Card.Img
          style={{ width: '250px', height: '250px', objectFit: 'cover', marginTop: '15px' }}
          variant="top"
          src={recipe.image}
        />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Button variant="primary" onClick={() => goToRecipePage(recipe.id)}>
            Recipe Details
          </Button>
        </Card.Body>
      </Card>
    ));
  }

  return (
    <div>
      <Modal
        show={failureModalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleFailureModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Recipe Searcher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Error? 🤨</h4>
          <p>{modalErrorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFailureModalClose}>
            Go back to Ingredient Search
          </Button>
        </Modal.Footer>
      </Modal>
      <Jumbotron>
        <h1>Matching Recipes</h1>
        <p>Below are some recipes that use ingredients you searched. Enjoy!</p>
      </Jumbotron>
      {loading ? (
        <div className="donutSpinner" />
      ) : (
        <CardColumns className="grid-container">{completedRecipeCards()}</CardColumns>
      )}
    </div>
  );
}
