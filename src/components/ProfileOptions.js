import React from 'react';
import NavBar from './NavBar'

class ProfileOptions extends React.Component {


    render() {
        console.log(this.props.user)
        return (
            <div>
                <NavBar />
                <h1>ProfileOptions Page!</h1>
            </div>
        )
    }
}

export default ProfileOptions