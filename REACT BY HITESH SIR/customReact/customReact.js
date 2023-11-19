

function customRender(reactElement,mainContainer) {
    const domElement = document.createElement(reactElement.type);

    domElement.innerHTML = reactElement.childre;

    domElement.setAttribute('href',reactElement.props.href);
    domElement.setAttribute('target',reactElement.props.target);

    mainContainer.appendChild(domElement)
}


const reactElement = {
    type: 'a',
    props: {
        href: `google.com`,
        target: `_blank`
    },
    childre:`Click me to visit Google`
}


const mainContainer = document.querySelector('#root');


customRender(reactElement, mainContainer)