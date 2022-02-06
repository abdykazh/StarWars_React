import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Item from './MyItem';

class ItemRow extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.url}>{this.props.url}</a>
      </li>
    )
  }
}

class StarWars extends React.Component {
  constructor() {
    super()
    this.state = {
      loadedCharacter: false,
      name: null,
      height: null,
      homeworld: null,
      aff: [],
      image: null
    }
  }

  getNewCharacter() {
    const num = Math.round(Math.random() * 82)
    const url = `https://akabab.github.io/starwars-api/api/id/${num}.json`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          aff: data.affiliations,
          image: data.image,
          loadedCharacter: true
        })
      })
  }

  render() {
    const affas = this.state.aff.map((url, i) => {
      return <ItemRow key={i} url={url} />
    })

    return (
      <div>
        <button
          type='button'
          onClick={() => this.getNewCharacter()}
          className='btn'>Randomize Character
        </button>
        {
          this.state.loadedCharacter &&
          <div>
            <h1>{this.state.name}</h1>
            <p>{this.state.height} cm</p>
            <p>Homeworld: {this.state.homeworld}</p>
            <img
              src={this.state.image}
              alt='character.img'
              height='250px'
              width='250px'>
            </img>
            <ul>
              {affas}
            </ul>
          </div>
        }
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StarWars />
      </header>
    </div>
  );
}

export default App;
