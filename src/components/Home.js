import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Home Page!</h1>
                <Link to={'/profile'}>TO PROFILE PAGE</Link><br></br>
                <Link to={'/createroom'}>TO ROOM CREATION</Link><br></br>
                <Link to={'/select'}>TO ROOM SELECT</Link><br></br>
            </div>
        )
    }
}

export default Home