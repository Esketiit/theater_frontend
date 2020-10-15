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
    loginStatus: false,
    user: {}
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/rooms")
  //     .then(resp => resp.json())
  //     .then(data => this.setState({ rooms: data }))
  // }

  // adds user data to app state and then redirects to the profile page
  successfulAuth = data => {
    console.log("successful auth", data)
    this.setState({
      loginStatus: true,
      user: data.user
    })
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <Router>
          {/* <Route path="/" exact render={routerProps => <Home {...routerProps} logout={this.logout} login={this.login} />} /> */}
          <Route path="/signup" render={routerProps => <Signup {...routerProps} successfulAuth={this.successfulAuth} />} />
          <Route path="/createroom" render={() => <RoomCreation user={this.state.user} />} />
          <Route path="/createplaylist" render={() => <PlalistCreation user={this.state.user} />} />
          <Route path="/profile" render={() => < ProfileOptions user={this.state.user} />} />
          <Route path="/select" render={routerProps => <RoomSelect {...routerProps} user={this.state.user} />} />
          <Route path="/room/:id" render={routerProps => <Room {...routerProps} user={this.state.user} />} />
        </Router>
      </>
    );
  }
}

// withRouter() adds router props to the component being exported, in this case it gives router props to app
// the gives access to things like this.props.history.push in app
export default App;
