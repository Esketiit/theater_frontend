import React from 'react';
import RoomFilter from '../components/RoomFilter'
import RoomList from './RoomList'
import NavBar from '../components/NavBar'
import Room from '../components/Room'
import { Route } from 'react-router-dom';

class RoomSelect extends React.Component {
    state = {
        tags: null,
        searchName: null,
        size: null
    }

    // This function makes a fetch request that gets all current rooms and sets state
    getAllRooms = () => {
        fetch("http://localhost:3000/rooms")
            .then(resp => resp.json())
            .then(data => this.setState({ rooms: data }))
    }

    componentDidMount() {
        this.getAllRooms()
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.filterByName())
    }

    filterByName = () => {
        return this.state.rooms.filter(room => room.name.includes(this.state.searchName))
    }

    render() {
        // console.log(this.props)
        return (
            <>
                <NavBar username={this.props.user.username} logout={this.props.logout} />
                <div className="roomselect">
                    <h1>Room List</h1>
                    <RoomFilter handleChange={this.handleChange} />
                    {this.state.rooms ? <RoomList rooms={this.filterByName()} /> : null}
                </div>
            </>
        )
    }
}

export default RoomSelect