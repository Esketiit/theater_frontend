import React from 'react';
import { Menu, Grid, Table, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class RoomList extends React.Component {
    state = {
        rooms: null
    }

    getAllRooms = () => {
        fetch("http://localhost:3000/room")
            .then(resp => resp.json())
            .then(data => this.setState({ rooms: data }))
    }
    componentDidMount() {
        this.getAllRooms()
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
                        return (
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue"><Link key={room.id} to={`/room/${room.id}`}>{room.name}</Link></Label>
                                </Table.Cell>
                                <Table.Cell>{room.playlist[0].name}</Table.Cell>
                                <Table.Cell>{room.description}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }

    render() {
        // console.log(this.props.rooms)
        return (
            <div>
                {this.state.rooms ? this.renderRooms() : null}
            </div>
        )
    }
}

export default RoomList