# Doggos are the best

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server-dev`

Starts the server in development mode and connects to the database.\
Server is listening on port 3003.

### `npm run seed`

Runs the seed.js file to generate a csv with 100 different cards, with names, descriptions, and creation times. 

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Directions

* Run `npm start`
* Run `npm run server-dev`
* Run `mysql -u root < database/schema.sql` 
  * This will create the database & tables
* In the browser, click 'Choose File', and upload data.csv or data2.csv
  * This will load all of the cards from that csv file 
  * You can also import your own if you have a csv file with the headers 'name, description, creationTime'


### Additional Features

* You can sort the cards alphabetically from A-Z or Z-A based on the card name
* You can search for a particular card name dynamically in the search bar
* You can add a new card and save it to the database. Just type in the Name and Description, and the Creation Time will be the local time of the user. 
* You can edit the name of any card
* You can delete any card