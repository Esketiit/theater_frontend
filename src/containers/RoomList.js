import React from 'react';
import { Menu, Grid, Table, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import Cable from '../components/Cable.js'

class RoomList extends React.Component {
    state = {
        rooms: null
    }

    // This function makes a fetch request that gets all current rooms and sets state
    getAllRooms = () => {
        fetch("http://localhost:3000/rooms")
            .then(resp => resp.json())
            .then(data => this.setState({ rooms: data }))
    }

    // checks for errors in data for each room
    checkRooms = () => {

    }

    componentDidMount() {
        this.getAllRooms()
    }

    // Updates room list when a new room is created
    handleReceievedRoom = e => {
        this.setState({
            rooms: [...this.state.rooms, e]
        })
    }

    renderRooms = () => {
        // console.log(this.props)
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Room Name</Table.HeaderCell>
                        <Table.HeaderCell>Room Playlist</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.rooms.map(room => {
                        // checks to see if this room has a playlist assigned to it. I need to address this playlist[0] thing
                        // I want to have each room have access to multiple playlist, but I havent got there yet
                        if (room.playlist[0]) {
                        console.log(room, "table body")
                        return (
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue"><Link key={room.id} to={`/room/${room.id}`}>{room.name}</Link></Label>
                                </Table.Cell>
                                <Table.Cell>{room.playlist[0].name ? room.playlist[0].name : "No Playlist name"}</Table.Cell>
                                <Table.Cell>{room.description}</Table.Cell>
                            </Table.Row>
                        )
                        } 
                    })}
                </Table.Body>
            </Table>
        )
    }

    render() {
        console.log(this.state, "render method")
        return (
            <div>
                {/* ActionCable connects to a channel and takes parameters that tell it what to do on certain actions */}
                {/* In this case, ActionCable connects to "rooms_channel" in the backend */}
                {/* when a new room is sent from the backend, handleReceievedRoom will run */}
                {/* read the docs bro */}
                <ActionCable
                    channel={'RoomsChannel'}
                    onReceived={this.handleReceivedRoom}
                />
                {/* If rooms already exist, render the Cable component */}
                {/* Cable creates an ActionCable for each individual room */}
                {/* not sure if this should be done here or in each room component */}
                {/* {this.state.rooms.length ? (
                    <Cable
                        rooms={this.state.rooms}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null} */}
                {this.state.rooms ? this.renderRooms() : null}
            </div>
        )
    }
}

export default RoomList