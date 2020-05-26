import React from 'react';
import RoomFilter from '../components/RoomFilter'
import RoomList from './RoomList'
import NavBar from '../components/NavBar'
import Room from '../components/Room'
import { Route } from 'react-router-dom';

class RoomSelect extends React.Component {
    state = {
        tags: null,
        searchName: "",
        size: null
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.filterByName())
    }

    filterByName = () => {
        return this.props.rooms.filter(room => room.name.includes(this.state.searchName))
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <NavBar />
                <h1>RoomSelect Page!</h1>
                <RoomFilter handleChange={this.handleChange} />
                {this.props.rooms ? <RoomList rooms={this.filterByName()} /> : null}
            </div>
        )
    }
}

export default RoomSelect