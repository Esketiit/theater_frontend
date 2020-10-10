import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './components/Signup'
import Room from './components/Room'
import RoomCreation from './components/RoomCreation'
import ProfileOptions from './components/ProfileOptions'
import RoomSelect from './containers/RoomSelect'
import PlalistCreation from './components/PlaylistCreation'
import './App.css';

class App extends React.Component {
  state = {
    rooms: null,
    user: "",
    loginStatus: "false",
    user: {}
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/rooms")
  //     .then(resp => resp.json())
  //     .then(data => this.setState({ rooms: data }))
  // }

  render() {
    // console.log(this.state)
    return (
      <>
        <Router>
          {/* <Route path="/" exact render={routerProps => <Home {...routerProps} logout={this.logout} login={this.login} />} /> */}
          <Route path="/signup" render={routerProps => <Signup {...routerProps} />} />
          <Route path="/createroom" render={() => <RoomCreation username={this.state.user} />} />
          <Route path="/createplaylist" render={() => <PlalistCreation username={this.state.user} />} />
          <Route path="/profile" component={ProfileOptions} />
          <Route path="/select" render={routerProps => <RoomSelect {...routerProps} username={this.state.user} />} />
          <Route path="/room/:id" render={routerProps => <Room {...routerProps} username={this.state.user} />} />
        </Router>
      </>
    );
  }
}

export default App;
