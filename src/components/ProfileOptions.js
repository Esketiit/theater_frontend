import React from 'react';
import NavBar from './NavBar'

class ProfileOptions extends React.Component {


    render() {
        return (
            <div>
                <NavBar username={this.props.user.username} logout={this.props.logout} />
                <h1>ProfileOptions Page!</h1>
            </div>
        )
    }
}

export default ProfileOptions