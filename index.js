const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = '3000';

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = req.query.newItemPrice;
  let cartTotal = req.query.cartTotal;

  let finalVaue = parseFloat(newItemPrice) + parseFloat(cartTotal);

  res.send(finalVaue.toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);

  if (isMember == 'true') {
    res.send(applyDiscount(cartTotal).toString());
  } else {
    res.send(cartTotal.toString());
  }
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = req.query.cartTotal;
  res.send(calculateTax(parseFloat(cartTotal)).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  switch (shippingMethod.toLowerCase()) {
    case 'standard':
      res.send((distance / 50).toString());
      break;
    case 'express':
      res.send((distance / 100).toString());
      break;
    default:
      res.statusCode = 400;
      res.send('invalid shipping method');
      break;
  }
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send((weight * distance * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send((purchaseAmount * loyaltyRate).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Utility functions

function applyDiscount(cartTotal) {
  let discountedPrice = cartTotal - (discountPercentage / 100) * cartTotal;
  return discountedPrice;
}

function calculateTax(amount) {
  return amount * (taxRate / 100);
}
