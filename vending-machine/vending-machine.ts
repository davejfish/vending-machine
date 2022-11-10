import process from 'node:process'

let arg = null;
let cost = null;
let payment = null;
let tender = null;

while((arg = process.argv.shift()) != null) {
  if(arg == '--item-cost') {
    const costInput = process.argv.shift()
    cost = Math.floor(Number(costInput || '0') * 100)
  } else if(arg == '--payment') {
    const paymentInput = process.argv.shift()
    payment = Math.floor(Number(paymentInput || '0') * 100)
  } 
  else if (arg == '--tender') {
    const tenderInput = process.argv.shift();
    tender = tenderInput || 'usd';
  }
}

console.error('--item-cost', cost)
console.error('--payment', payment)

// Narrow cost to a number.
if(cost == null) {
  console.error('--item-cost is required but not provided. Exiting.')
  process.exit(1)
}
if(payment == null) {
  console.error('--payment is required but not provided. Exiting.')
  process.exit(2)
}
if (tender == null) {
  console.error('--tender is required to be a string. Exiting')
  process.exit(3);
}

// Implement your vending machine here!
// import coins from './currencies.js';
import jsonCoins from './currencies.json'
const coins = JSON.parse(jsonCoins);


const currency = coins[tender]
console.log(currency);
if (currency == null) {
  console.log('unknown currency');
  process.exit(4)
}

let changeToBeReturned = payment - cost;
let changeObject: Record<string, number> = {};

if (changeToBeReturned < 0) {
  console.log('status: failure \nmessage: Not enough money')
  process.exit(5);
}

for (let [coin, value] of Object.entries(currency)) {
  while (changeToBeReturned >= value) {
    changeObject[coin] = Math.floor(changeToBeReturned / value);
    changeToBeReturned = changeToBeReturned % value;
  }
}


console.log('status: success\nyour change is: ', changeObject);