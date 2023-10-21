

console.log(`Exporting Module`);

const shippingCost = 10;

const cart = [];


export const addToCart = function(product,quantity) {
    cart.push({quantity, product});

    console.log(`${quantity} ${product} have been added to the cart`);
}

const totalPrice = 297;

const totalQuantity = 23;

export {totalPrice,totalQuantity as tq};

export default function(product,quantity) {
    cart.push({quantity, product});

    console.log(`${quantity} ${product} have been added to the cart`);
};