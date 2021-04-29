const faker = require('faker');
const ObjectsToCsv = require('objects-to-csv');

// need to generate 100 different cards -- 

let generateCard = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    const card = {
      name: faker.animal.dog(),
      description: faker.lorem.sentences(),
      creationTime: faker.date.between('2020-01-01', '2021-04-27')
    }
    data.push(card);
  }
  return data;
}

const allData = generateCard(100);


new ObjectsToCsv(allData).toDisk('./data2.csv');