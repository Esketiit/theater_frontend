import React from 'react';
import NavBar from './NavBar'
import  { Redirect } from 'react-router-dom'

class ProfileOptions extends React.Component {

    render() {
        
        if (!this.props.user.username) {
            return <Redirect to='/signup' />
        }
        return (
            <div>
                <NavBar username={this.props.user.username} logout={this.props.logout} />
                <h1>ProfileOptions Page!</h1>
            </div>
        )
    }
}

export default ProfileOptions