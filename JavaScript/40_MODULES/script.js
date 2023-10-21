// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";

// addToCart("bread", 5);

// console.log(price, tq);

console.log(`Importing Module`);

// import * as ShoopingCart from './shoppingCart.js';

// ShoopingCart.addToCart('pauruti',10)

import add from "./shoppingCart.js";

// add('chop',12)

const getLastPost = async function () {
  const ranmdomPosts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if(!ranmdomPosts.ok) throw new Error(`Unable to get the data`);

  const data = await ranmdomPosts.json();

  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};


// getLastPost().then((res) => console.log(res)).catch((err) => console.log(err))

// const lastPost2 = await getLastPost();

// console.log(lastPost2);


const shoppingCart2 =  (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product,quantity) {
        cart.push({quantity, product});
    
        console.log(`${quantity} ${product} have been added to the cart`);
    }

    const orderStock = function(product,quantity) {
        // cart.push({quantity, product});
    
        console.log(`${quantity} ${product} orders from supplier`);
    }

    return {addToCart,totalPrice,totalQuantity,cart}
})();


shoppingCart2.addToCart('appels',54)

console.log(shoppingCart2);

import cloneDeep from 'lodash-es'


if(module.hot) {
  module.hot.accept();
}

