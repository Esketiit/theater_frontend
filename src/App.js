import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home'
import Room from './components/Room'
import RoomCreation from './components/RoomCreation'
import ProfileOptions from './components/ProfileOptions'
import RoomSelect from './containers/RoomSelect'
import PlalistCreation from './components/PlaylistCreation'
import './App.css';

class App extends React.Component {
  state = {
    rooms: null,
    user: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/room")
      .then(resp => resp.json())
      .then(data => this.setState({ rooms: data }))
  }

  login = name => {
    this.setState({ user: name })
    console.log(name)
  }

  logout = () => {
    this.setState({ user: "" })
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Router>
          <Route path="/" exact render={routerProps => <Home {...routerProps} login={this.login} />} />
          <Route path="/home" render={routerProps => <Home {...routerProps} login={this.login} />} />
          <Route path="/createroom" component={RoomCreation} />
          <Route path="/createplaylist" component={PlalistCreation} />
          <Route path="/profile" component={ProfileOptions} />
          <Route path="/select" render={routerProps => <RoomSelect {...routerProps} rooms={this.state.rooms} />} />
          <Route path="/room/:id" render={routerProps => <Room {...routerProps} user={this.state.user} />} />
        </Router>
      </>
    );
  }
}

export default App;
