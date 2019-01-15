import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../services/swapi-service";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(){
    this.setState({ hasError: true })
  }

  render(){
    if(this.state.hasError) {
      return <ErrorIndicator />
    }
    return this.props.children
  }
}

const Row = ({left, right}) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        <button onClick={()=> {
          throw new Error()
        }}>Error</button>
        {right}
      </div>
    </div>
  )
};
export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson })
  };

  componentDidUpdate(){
    throw new Error();
  }

  render(){
    const itemList = (
      <ItemList
        onItemSelected={ this.onPersonSelected }
        getData={this.swapiService.getAllPeople}
        renderItem={({name, gender}) => `${name} (${gender})`}
      />
    );

    const personDetails = (
      <PersonDetails personId={ this.state.selectedPerson }/>
    );

    return (
      <ErrorBoundary>
        <Row left={itemList} right={personDetails} />
        <Row left={null} right="Bar" />
      </ErrorBoundary>
    )
  }
}
