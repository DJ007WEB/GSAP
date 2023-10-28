import View from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = `No Recipes found for your query! Please try again`;
  _successMessage = "";


  _generateMarkup() {
    // console.log(this._data);
    return this._data.map((book) => previewView.render(book,false)).join("");
  }
}

export default new ResultView();
