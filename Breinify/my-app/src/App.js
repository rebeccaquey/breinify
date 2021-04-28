import React, { useState } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CSVReader from 'react-csv-reader'


function App() {
  const [uploadedFile, setUploadedFile] = useState({});

  const handleChange = (data) => {
    axios.post('http://localhost:3003/', data)
      .then(result => {
        console.log('Success: ', result);
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  return (
    <div className="App">
      <header className="App-header">
        <CSVReader onFileLoaded={handleChange} parserOptions={papaparseOptions}/>
      </header>
      <div>

      </div>
    </div>
  );
}

export default App;
