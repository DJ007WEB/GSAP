import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import paginationView from "./view/paginationView.js";
import bookmarkView from "./view/bookmarkView.js";
import addRecipeView from "./view/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { MODAL_CLOSE_SECS } from "./config.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  // 1) Loading Recipe

  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultView.update(model.getSearchResultsPage());

    bookmarkView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    const { recipe } = model.state;

    // 2) Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.log(error);
  }
};

// controlRecipe();

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    // console.log(model.state);

    resultView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    // console.log(error);
  }
};

const controlPagination = function (pageNo) {
  // console.log('Working Pagination');

  resultView.render(model.getSearchResultsPage(pageNo));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {


  try {

    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // console.log(model.state.recipe);

    addRecipeView.renderSucces()

    setTimeout(function() {
      addRecipeView.windowToggle();
    }, MODAL_CLOSE_SECS*1000)

    bookmarkView.render(model.state.bookmarks);
    recipeView.render(model.state.recipe)
    bookmarkView.update(model.state.bookmarks);


    window.history.pushState(null,'',`#${model.state.recipe.id}`)

  } catch (error) {
    addRecipeView.renderError(error);
  }
};

const init = function () {
  bookmarkView.addHandlerLoadBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandleraddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
