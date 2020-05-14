import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home'
import Room from './components/Room'
import RoomCreation from './components/RoomCreation'
import ProfileOptions from './components/ProfileOptions'
import RoomSelect from './containers/RoomSelect'
import './App.css';

class App extends React.Component {

  render() {
    return (
      <>
        <Router>
          <Route path="/home" component={Home} />
          <Route path="/create" component={RoomCreation} />
          <Route path="/profile" component={ProfileOptions} />
          <Route path="/select" component={RoomSelect} />
          <Route path="/room" render={routerProps => <Room {...routerProps} />} />
        </Router>
      </>
    );
  }
}

export default App;
