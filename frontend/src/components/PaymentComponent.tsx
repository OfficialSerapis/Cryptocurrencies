// PaymentComponent.tsx
import { useState } from 'react';
import { ethers } from 'ethers';

function PaymentComponent({ seleniumAddress, electrumAddress, processorAddress }) {
  const [selAmount, setSelAmount] = useState('');
  const [elcAmount, setElcAmount] = useState('');

  const handlePayment = async () => {
    // Connect wallet + approve tokens + call makePayment
    alert("Payment logic goes here (connect with ethers.js)");
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <input placeholder="Selenium Coin amount" value={selAmount} onChange={e => setSelAmount(e.target.value)} />
      <input placeholder="Electrum Coin amount" value={elcAmount} onChange={e => setElcAmount(e.target.value)} />
      <button onClick={handlePayment}>Pay Now (Bonus if both used)</button>
    </div>
  );
}
