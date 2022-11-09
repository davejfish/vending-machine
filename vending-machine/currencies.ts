interface Coins {
  [coinName: string]: number
}

  const usd: Coins = {
    quarters: 25,
    dimes: 10,
    nickels: 5,
    pennies: 1
}

  const yen: Coins = {
  五百円玉: 500,
  百円玉: 100,
  五十円玉: 50,
  十円玉: 10,
  五円玉: 5,
  一円玉: 1
}

const coins: {[k: string]: Coins} = {usd, yen}

export default coins;
