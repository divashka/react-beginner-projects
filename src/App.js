import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

 const [fromCurrency, setFromCurrency] = useState('RUB');
 const [toCurrency, setToCurrency] = useState('USD');
 const [fromPrice, setFromPrice] = useState(0);
 const [toPrice, setToPrice] = useState(1);

 //const [rates, setRates] = useState({});
 const ratesRef =  useRef({});

 useEffect(() => {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "siKBCnK3haBqZUF0QJt2nQUQxtB75ik4");

  let requestOptions = {
   method: 'GET',
   redirect: 'follow',
   headers: myHeaders
  };

  fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2C%20USD%2C%20RUB%2C%20GBP&base=USD", requestOptions)
   .then((response) => response.json())
   .then((json) => {
    //setRates(json.rates)
    ratesRef.current = json.rates;
    onChangeToPrice(1);
   })
   .catch(error => console.log('error', error));
 })

 const onChangeFromPrice = (value) => {
  const price = value / ratesRef.current[fromCurrency];
  const result = price * ratesRef.current[toCurrency];
  setToPrice(result);
  setFromPrice(value);
 }

 const onChangeToPrice = (value) => {
  const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setFromPrice(result);
  setToPrice(value);
 }

 useEffect(() => {
  onChangeFromPrice(fromPrice);
 }, [fromPrice])

 useEffect(() => {
  onChangeToPrice(toPrice);
 }, [toPrice])

 return (
  <div className="App">
   <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
   <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
  </div>
 );
}

export default App;
