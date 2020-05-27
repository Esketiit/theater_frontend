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
                    <Menu.Item>
                        <Link to={'/createroom'}>TO ROOM CREATION</Link>
                    </Menu.Item>
                    {/* <Menu.Item>
                        <Link to={'/createplaylist'}>TO PLAYLIST CREATION</Link>
                    </Menu.Item> */}
                    <Menu.Item>
                        <Link to={'/select'}>TO ROOM SELECT</Link>
                    </Menu.Item>
                    <Menu.Item>
                        Logged in as:
                    </Menu.Item>
                    <Menu.Item >
                        <Button onClick={() => this.logout()}>LOG OUT</Button>
                    </Menu.Item>

                </Menu>
            </div>
        )
    }
}

export default NavBar