import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class NavBar extends React.Component {


    render() {
        return (
            <div className="NavBar">
                <Menu compact inverted color="blue">
                    <Menu.Item>
                        <Link to={'/profile'}>TO PROFILE PAGE</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/createroom'}>TO ROOM CREATION</Link>
                    </Menu.Item>
                    {/* <Menu.Item>
                        <Link to={'/createplaylist'}>TO PLAYLIST CREATION</Link>
                    </Menu.Item> */}
                    <Menu.Item>
                        <Link to={'/select'}>TO ROOM SELECT</Link>
                    </Menu.Item>

                </Menu>
            </div>
        )
    }
}

export default NavBar