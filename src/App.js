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

  // adds user data to app state and then redirects to the profile page
  successfulAuth = data => {
    this.setState({
      loginStatus: data.logged_in,
      user: data.user
    })
    console.log(data, "data in succesfulAuth")
    console.log(this.state, "app state after successful auth")
  }

  // REMEMBER THIS: if you want to do ANYTHING with cookies/sessions using fetch, remember to add this: credentials: 'include'
  // ex.
  // fetch("link", {
  //      method: "GET",
  //      headers: headerVariable,
  //      credentials: 'include'    <==== THIS RIGHT HERE
  // })
  // DONT FORGET PLEEAASE, your sanity wont withstand that kind of stress twice!
  // Axios makes accessing api's easier to type, you should probably look into it

  checkLoginStatus = () => {
    fetch("http://localhost:3000/logged_in", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.logged_in && this.state.loginStatus === false) {
          this.setState({
            loginStatus: true,
            user: data.user
          })
        } else if (!data.logged_in && this.state.logged_in) {
          this.setState({
            loginStatus: false,
            user: {}
          })
        }
        console.log(data, "data in checklogin")
        console.log(this.state, "app state after checklogin")
      })
      .catch(error => console.log(error))
  }

  // does this need to passed into every instance of navbar? why can't navbar just have this? to update state, damn
  logout = () => {
    console.log("logged out")
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
    // this.setState({
    //   logged_in: true,
    //   user: {}
    // })
  }

  componentDidMount() {
    this.checkLoginStatus()

  }
  render() {
    return (
      <>
        <Router>
          {/* <Route path="/" exact render={routerProps => <Home {...routerProps} logout={this.logout} login={this.login} />} /> */}
          <Route path="/signup" render={routerProps => <Signup {...routerProps} successfulAuth={this.successfulAuth} />} />
          <Route path="/createroom" render={() => <RoomCreation user={this.state.user} logout={this.logout} />} />
          <Route path="/createplaylist" render={() => <PlalistCreation user={this.state.user} logout={this.logout} />} />
          <Route path="/profile" render={() => < ProfileOptions user={this.state.user} logout={this.logout} />} />
          <Route path="/select" render={routerProps => <RoomSelect {...routerProps} user={this.state.user} logout={this.logout} />} />
          <Route path="/room/:id" render={routerProps => <Room {...routerProps} user={this.state.user} logout={this.logout} />} />
        </Router>
      </>
    );
  }
}

export default App;
