import React from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class NavBar extends React.Component {


    render() {
        return (
            <div className="NavBar">
                <Menu inverted color="blue">
                    {/* <Menu.Item>
                        <Link to={'/profile'}>TO PROFILE PAGE</Link>
                    </Menu.Item> */}
                    <Menu.Item >
                        <Link to={'/createroom'}>TO ROOM CREATION</Link>
                    </Menu.Item>
                    {/* <Menu.Item>
                        <Link to={'/createplaylist'}>TO PLAYLIST CREATION</Link>
                    </Menu.Item> */}
                    <Menu.Item>
                        <Link to={'/select'}>TO ROOM SELECT</Link>
                    </Menu.Item>
                    <Menu.Item >
                        {this.props.username ? <Link to={'/signup'}>LOGOUT</Link> : <Link to={'/signup'}>LOGIN</Link>}
                    </Menu.Item>
                    <Menu.Item>
                        {this.props.username ? `Logged In As: ${this.props.username}` : "Not Logged In"}
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default NavBar