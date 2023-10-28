import View from "./view.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = `No bookmarks added yet. PLease find one and add it :)`;
  _successMessage = "";


  _generateMarkup() {
    // console.log(this._data);
    return this._data.map((book) => previewView.render(book,false)).join("");
  }

  addHandlerLoadBookmark(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
