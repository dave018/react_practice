import { useState, useEffect } from "react";

const ticker_url = "https://api.coinpaprika.com/v1/tickers";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [moneyToBitcoin, setMoneyToBitcoin] = useState(0);
  useEffect(() => {
    fetch(ticker_url)
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);

        const item = json.find((item) => item.name === "Bitcoin");
        setBitcoinPrice(item.quotes.USD.price);
        console.log(item);
      });
  }, []);
  const handleInputChange = (event) => {
    const money = event.target.value;
    setInputValue(money);
    setMoneyToBitcoin(money / bitcoinPrice);
  };
  const conClick = (event) => {
    setMoney(inputValue);
  };
  console.log("bitcoin price: ", bitcoinPrice);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <input
        type="text"
        name="money"
        placeholder="Enter your money"
        onChange={handleInputChange}
      ></input>
      <button onClick={conClick}>Converter</button>
      <hr />
      <input
        type="text"
        name="m-b"
        placeholder="Your money to Bitcoin"
        value={moneyToBitcoin}
      ></input>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              <strong>
                {coin.name}({coin.symbol}): {coin.quotes.USD.price} USD
              </strong>
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
