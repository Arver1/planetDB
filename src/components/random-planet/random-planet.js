import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner';
import PlanetView from './planet-view';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
      });
  };

  onError = (error) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  updatePlanet = () => {
    const id = 2 + Math.random() * 17 ^ 0;
    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {
    const { planet, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {loading && <Spinner />}
        {error && <ErrorIndicator />}
        {!loading && !error && <PlanetView planet={planet} />}
        </div>
    )
  }
}
