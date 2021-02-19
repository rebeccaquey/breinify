import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { dressData } from './dressData';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allDresses: dressData,
      allSizes: [],
      allColors: [],
      selectedSizes: [],
      selectedColors: [],
      sortBy: 'colors',
    }
    this.onRemove = this.onRemove.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.colormultiselectRef = React.createRef();
    this.sizemultiselectRef = React.createRef();
  }
  
  componentDidMount() {
    let colors = new Set();
    let sizes = new Set();
    let dressColors = [];
    let dressSizes = [];

    dressData.map((data) => {
      if (!colors.has(data.color)) {
        colors.add(data.color)
      }
      if (!sizes.has(data.size)) {
        sizes.add(data.size);
      }
    })

    for (let eachColor in colors) {
      dressColors.add(eachColor);
    }
    for (let eachSize in sizes) {
      dressSizes.add(eachSize);
    }

    colors.forEach(color => {
      dressColors.push({color: color})
    })

    colors = [...colors].sort();
    console.log(dressColors);
    sizes = [...sizes].sort((a,b) => (a-b))

    sizes.forEach(size => {
      dressSizes.push({dressSize: size.toString()})
    })
    console.log(dressSizes);

    this.setState({
      allSizes: dressSizes,
      allColors: dressColors
    })
  }

  handleChange(e) {
    this.setState({sortBy: e.target.value})
  }

  handleClear() {
    this.colormultiselectRef.current.resetSelectedValues();
    this.sizemultiselectRef.current.resetSelectedValues();

    this.setState({
      selectedColors: [],
      selectedSizes: [],
    })
  }

  onSelect(selectedList, selectedItem) {
    let colors = this.state.selectedColors;
    let sizes = this.state.selectedSizes;
    if (selectedList[0].color) {
      colors.push(selectedItem);
      this.setState({selectedColors: colors})
    } else {
      sizes.push(selectedItem);
      this.setState({selectedSizes: sizes})
    }
  }

  onRemove(selectedList, removedItem) {
    let colors = [];
    let sizes = []
    if (selectedList.length === 0) {
      if (removedItem.hasOwnProperty('dressSize')) {
        this.setState({selectedSizes: []})
      } else {
        this.setState({selectedColors: []})
      }
    } else {
        if (selectedList[0].color) {
          for (let i = 0; i < this.state.selectedColors.length; i++) {
            if (this.state.selectedColors[i].color !== removedItem.color) {
              colors.push(this.state.selectedColors[i]);
            }
          }
          this.setState({selectedColors: colors})
        } else {
          for (let i = 0; i < this.state.selectedSizes.length; i++) {
            console.log('this.state.selected', this.state.selectedSizes)
            if (this.state.selectedSizes[i].dressSize !== removedItem.dressSize) {
              sizes.push(this.state.selectedSizes[i]);
            }
          }
          this.setState({selectedSizes: sizes})
        }
    }
  }


  render() {
    // console.log('colors', this.state.allColors);
    // console.log('sizes', this.state.allSizes)
    let displayed;
    if (this.state.sortBy === 'lowToHigh') {
      //display by price, low to high
      this.state.allDresses.sort((a,b) => (
        a.price - b.price
      ))
    } else if (this.state.sortBy === 'highToLow') {
      //display by price, high to low
      this.state.allDresses.sort((a,b) => (
        b.price - a.price
      ))
    } else {
      this.state.allDresses.sort((a,b) => {
        if (a.color < b.color) {
          return -1;
        }
        if (a.color > b.color) {
          return 1;
        }
        return 0;
      })
    }
    if ((this.state.selectedColors.length === 0) && (this.state.selectedSizes.length === 0)) {
      displayed = (
      <div className="dressSortResults">
        {this.state.allDresses.map((dressDataItem) => (
          <div className="dressGridItem">
            <div className="dressGridImgContainer">
              <img src={dressDataItem['photo_url']} width={150}/>
            </div>
            <div>${dressDataItem['price']}</div>
            <div>Size {dressDataItem['size']}</div>
            <div>Color: {dressDataItem['color']}</div>
          </div>
        ))}
      </div>
      )
    } else {
      let colors = [];
      for (let i = 0; i < this.state.selectedColors.length; i++) {
        colors.push(this.state.selectedColors[i].color);
      }

      let sizes = [];
      for (let i = 0; i < this.state.selectedSizes.length; i++) {
        sizes.push(this.state.selectedSizes[i].dressSize);
      }

      let filtered = this.state.allDresses.filter((dressDataItem) => {
        if (colors.length > 0 && sizes.length > 0) {
          return (colors.includes(dressDataItem.color) && sizes.includes(dressDataItem.size.toString()))
        } else if (colors.length === 0) {
          return sizes.includes(dressDataItem.size.toString())
        } else {
          return colors.includes(dressDataItem.color)
        }
      })
      displayed = (
        <div className="dressSortResults">
        {filtered.map((dressDataItem) => (
          <div className="dressGridItem">
            <div className="dressGridImgContainer">
              <img src={dressDataItem['photo_url']} width={150}/>
            </div>
            <div>${dressDataItem['price']}</div>
            <div>Size {dressDataItem['size']}</div>
            <div>Color: {dressDataItem['color']}</div>
          </div>
        )
        )}
      </div>
      )
    }


    return (
      <div className="App">
        <header className="App-header">
          Queenly Interview Take-Home Exercise: Sorting and Filtering Dresses
        </header>
        <p className="instructions">
          Instructions: At Queenly, we want our users to be able to find the perfect dress.
          <br/>
          Given the list of dresses imported from "dressData.js",
          create buttons to sort and filter through the dresses.
          <br/>
          Please implement the following functionality:
          <br/>
          <br/>
          - Filter by color, both single and multiple (show only blue/yellow/red dresses)
          <br/>
          - Filter by size, both single and multiple sizes (show only size 0/size 4/etc)
          <br/>
          - Sort by price low to high and sort by price high to low
          <br/>
          - Any combinations of the above
          <br/>
        </p>
        <div className="dressFilters">
          {/* Put your filter/sort buttons and dropdown menus here: */}
          <div class="flex-container">
            <div class="flex-child colors">
              <Multiselect
              options={this.state.allColors}
              placeholder="Colors"
              onSelect={this.onSelect}
              onRemove={this.onRemove}
              displayValue="color"
              showCheckbox="true"
              ref={this.colormultiselectRef}
              />
            </div>
            <div class="flex-child sizes">
              <Multiselect
              options={this.state.allSizes}
              placeholder="Sizes"
              onSelect={this.onSelect}
              onRemove={this.onRemove}
              displayValue="dressSize"
              showCheckbox="true"
              ref={this.sizemultiselectRef}
              />
            </div>

            <div class="flex-child sort">
              <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleChange}>
                  <option value="colors">Sort by colors</option>
                  <option value="lowToHigh">Sort by price: Low to High</option>
                  <option value="highToLow">Sort by price: High to Low</option>
                </select>
              </form>
            </div>
            <button class="flex-child" onClick={this.handleClear}>Clear All Filters</button>

          </div>

        </div>
        {displayed}
      </div>
    );
  }
}

export default App;
