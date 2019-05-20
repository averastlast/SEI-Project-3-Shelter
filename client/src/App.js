import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ShelterList from './components/ShelterList.js'
import ShelterSingle from './components/ShelterSingle.js'
import DogSingle from './components/DogSingle.js'

function App() {
  return (
    <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ShelterList}/>
            <Route path="/shelter/:id" component={ShelterSingle}/>
            <Route path="/:shelterName/dog/:dogId" component={DogSingle}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;

