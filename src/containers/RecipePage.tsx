import React, { useEffect, useState } from 'react';
import getPageName from 'helpers/getPageName';
// import { useHistory } from 'react-router-dom';
// import Modal from 'react-bootstrap/modal';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import CardColumns from 'react-bootstrap/CardColumns';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

type Props = {
  recipeID: string;
};

export default function RecipePage({ recipeID }: Props) {
  useEffect(() => {
    getPageName(window.location.pathname);
  }, []);
  return <div> this is the page for recipeID: {recipeID}</div>;
}
