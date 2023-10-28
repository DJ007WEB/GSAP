import icons from "url:../../img/icons.svg";

export default class View {
  _data;


  /**
   * 
   * @param {*} data 
   * @param {*} render 
   * @returns 
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markUp = this._generateMarkup();

    if(!render) return markUp;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    this._data = data;

    const newMarkUp = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkUp);

    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl,i) => {
      const currEl = currElements[i];
      if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        currEl.textContent = newEl.textContent;
      }

      if(!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach((eachAtt) => {
          currEl.setAttribute(eachAtt.name, eachAtt.value);
        })
      }
    })

  
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markUp = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
        `;
    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError(message = this._errorMessage) {
    const markUp = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderSucces(message = this._successMessage) {
    const markUp = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
