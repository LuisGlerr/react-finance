import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [isResponse, setResponse] = useState([]);
  //const [isCategories, setCategories] = useState([]);

  const fetchDataCat = async () => {
    const response = await axios.get('https://9166-2806-2f0-a1a0-ed49-e84b-3e8-2d6f-9aca.ngrok-free.app/transactions');
    setResponse(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://9166-2806-2f0-a1a0-ed49-e84b-3e8-2d6f-9aca.ngrok-free.app/transactions');
      setResponse(response.data);
    };
    fetchData();
  }, []);

  const handleClick = () => {

    fetchDataCat()
    setResponse([])
  }
  
  return (
    <div>
      {isResponse.map(transaction => (
        <div key={transaction.id}>
          <h3>{transaction.name}</h3>
          <p>{transaction.amount}</p>
          <p>{transaction.date}</p>
        </div>
      ))}
      <button onClick={handleClick}>Algo</button>
        {isResponse.length >= 1 && isResponse.map(transaction => (
        <div key={transaction.id}>
          <h3>{transaction.name}</h3>
          <p>{transaction.amount}</p>
          <p>{transaction.date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
