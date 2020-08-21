export default function getPageName(url: string) {
  const pageName = window.location.pathname.split('/')[1];
  document.title = `Recipe Searcher - ${getPageName(pageName)}`;

  function getPageName(pageName: string) {
    // switch (pageName) {
    //   case '':
    //     return 'Home';
    //   case 'about':
    //     return 'About';
    //   case 'login':
    //     return 'Log in';
    //   case 'register':
    //     return 'Register';
    //   case 'recipeSearch':
    //     return 'Results';
    //   default:
    //     return '?';
    // }
    if (pageName === '') {
      return 'Home';
    }

    if (pageName === 'about') {
      return 'About';
    }

    if (pageName === 'login') {
      return 'Log in';
    }

    if (pageName === 'register') {
      return 'Register';
    }

    if (pageName === 'recipeSearch') {
      return 'Results';
    }

    if (pageName === 'recipe') {
      return 'Recipe';
    }
  }
}
