import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import PersonDetails from '../person-details';
import ItemList from '../item-list';

import './app.css';
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: null
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };

  render() {

    const planet = this.state.showRandomPlanet;

    return (
      <div className="stardb-app">
        <Header />
        { planet &&  <RandomPlanet/>}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={ this.onPersonSelected }
              getData={this.swapiService.getAllPlanets}
              renderItem={(item) => (<span>{item.name}<button>!</button></span>)}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={ this.state.selectedPerson }/>
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={ this.onPersonSelected }
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={ this.state.selectedPerson }/>
          </div>
        </div>
      </div>
    );
  }
}
