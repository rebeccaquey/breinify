import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CSVReader from 'react-csv-reader';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import EachCard from './EachCard.js';
import CardModal from './CardModal.js';

function App() {
  const [cardData, setCardData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [filteredData, setFilteredData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState();

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
        setFilteredData(data);
      })
      .catch(err => {
        console.log('Get request error: ', err)
    });
  }

  // const handleClick = () => {
  //   setFilteredData(cardData.filter(name => name.card_name.toLowerCase().includes(searchWord.toLowerCase())))
  // }

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
    setFilteredData(cardData.filter(name => name.card_name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleDeleteCard = (cardId) => {
    axios.delete(`/cards/${cardId}`)
    .then(result => {
      console.log('Successful Delete request: ', result);
    })
    .catch(err => {
      console.log('Delete request error: ', err);
    })
    .then(setIsLoaded(false))
  }

  const handleEditCard = (cardId, newName) => {
    axios.patch(`/cards/${cardId}`, {card_name: newName})
    .then(result => {
      console.log('Successful Patch request: ', result);
    })
    .catch(err => {
      console.log('Patch request error: ', err);
    })
    .then(setIsLoaded(false))
  }

  const sortByNameAsc = () => {
    const sortedData = filteredData.sort((a,b) => {
      let aName = a.card_name.toLowerCase(),
      bName = b.card_name.toLowerCase();
      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
    })
    setFilteredData([...sortedData])
  }

  const sortByNameDesc = () => {
    const sortedData = filteredData.sort((a,b) => {
      let aName = a.card_name.toLowerCase(),
      bName = b.card_name.toLowerCase();
      if (aName < bName) {
        return 1;
      }
      if (aName > bName) {
        return -1;
      }
      return 0;
    })
    setFilteredData([...sortedData])
  }

  const handleHideModal = () => {
    setShowModal(false);
  }

  const handleModalClick = () => {
    setShowModal(!showModal);
  }

  const handleEditClick = (e) => {
    setCardToEdit(e)
  }

  useEffect(() => {
    getCards();
  }, [isLoaded]);

  return (
    <div className="App">
      <header className="App-header">
        <span>
          Sort By: 
          {' '}
          <Button variant="outline-primary" onClick={sortByNameAsc}>
          Ascending
          </Button>
          {' '}
          <Button variant="outline-primary" onClick={sortByNameDesc}>
          Descending
          </Button>
        </span>
        <CSVReader onFileLoaded={handleChange} parserOptions={papaparseOptions}/>
        <Form inline>
          <FormControl type="text" value={searchWord} onChange={handleSearchChange} className="mr-sm-2" placeholder="Search" />
          {/* <Button variant="outline-success" onClick={handleClick}>
            Search
          </Button> */}
        </Form>
      </header>
      <CardModal 
        show={showModal} 
        onHide={handleHideModal} 
        handleEditCard={handleEditCard} 
        handleDeleteCard={handleDeleteCard} 
        cardDetails={cardToEdit} 
      />
      <Container fluid className="justify-content-start">
        <CardDeck>
          {filteredData && filteredData.map((cardDetails, i) => (
            <EachCard 
              cardDetails= {cardDetails}
              key={i}
              handleDeleteCard = {handleDeleteCard}
              handleEditCard = {handleEditCard}
              handleModalClick = {handleModalClick}
              handleEditClick = {handleEditClick}
            />
          ))}
        </CardDeck>
      </Container>
    </div>
  );
}

export default App;
