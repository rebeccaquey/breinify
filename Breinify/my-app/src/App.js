import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from "react-bootstrap/Container";
import EachCard from './EachCard.js';



function App() {
  const [cardData, setCardData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (data) => {
    setIsLoaded(false);
    axios.post('http://localhost:3003/', data)
      .then(result => {
        console.log('Successful Post request: ', result);
      })
      .catch(err => {
        console.log('Post request error: ', err);
      });
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  const getCards = () => {
    axios.get('http://localhost:3003/cards')
      .then(({data}) => {
        setCardData(data);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log('Get request error: ', err)
    });
  }

  useEffect(() => {
    getCards();
  }, [isLoaded]);

  return (
    <div className="App">
      <header className="App-header">
        <CSVReader onFileLoaded={handleChange} parserOptions={papaparseOptions}/>
      </header>
      <Container fluid className="justify-content-start">
        <CardDeck>
          {cardData && cardData.map((cardDetails, i) => (
            <EachCard 
              cardDetails= {cardDetails}
              key={i}
            />
          ))}
        </CardDeck>
      </Container>
    </div>
  );
}

export default App;

// col-sm-6 col-lg-3 py-2