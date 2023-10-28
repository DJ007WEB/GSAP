import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      console.log(gotoPage);

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currPage === 1 && numPages > 1) {
      return this._generateMarkUpNextBtn(currPage);
    }

    if (currPage === numPages && numPages > 1) {
      return this._generateMarkUpPrevBtn(currPage);
    }

    if (currPage < numPages) {
      const prevBtn = this._generateMarkUpPrevBtn(currPage);
      const nextBtn = this._generateMarkUpNextBtn(currPage);

      return prevBtn + nextBtn;
    }

    return ``;
  }

  _generateMarkUpPrevBtn(currPage) {
    return `<button data-goto=${
      currPage - 1
    } class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currPage - 1}</span>
  </button>`;
  }

  _generateMarkUpNextBtn(currPage) {
    return `
      <button data-goto=${
        currPage + 1
      } class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
  }
}

export default new PaginationView();
