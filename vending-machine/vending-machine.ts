import process from 'node:process'

let arg = null
let cost = null
let payment = null

while((arg = process.argv.shift()) != null) {
  if(arg == '--item-cost') {
    const costInput = process.argv.shift()
    cost = Math.floor(Number(costInput || '0') * 100)
  } else if(arg == '--payment') {
    const paymentInput = process.argv.shift()
    payment = Math.floor(Number(paymentInput || '0') * 100)
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
// Implement your vending machine here!

const coins: object = {
  quarters: 25,
  dimes: 10,
  nickels: 5,
  pennies: 1
}

let changeToBeReturned = payment - cost;
let changeObject: Record<string, number> = {};

if (changeToBeReturned < 0) {
  console.log('status: failure \nmessage: Not enough money')
  process.exit(3);
}

while (changeToBeReturned > 0) {
  for (let [coin, value] of Object.entries(coins)) {
    while (changeToBeReturned >= value) {
      changeObject[coin] = Math.floor(changeToBeReturned / value);
      changeToBeReturned = changeToBeReturned % value;
    }
  }
}

console.log('status: success\nyour change is: ', changeObject);