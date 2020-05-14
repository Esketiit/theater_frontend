import React from 'react';
import RoomFilter from '../components/RoomFilter'
import RoomList from './RoomList'

class RoomSelect extends React.Component {


    render() {
        return (
            <div>
                <h1>RoomSelect Page!</h1>
                <RoomFilter />
                <RoomList />
            </div>
        )
    }
}

export default RoomSelect