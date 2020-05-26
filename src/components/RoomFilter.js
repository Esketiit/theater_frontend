import React from 'react';
import { Form, } from 'semantic-ui-react'

class RoomFilter extends React.Component {


    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Filter By Room Name:</label>
                        <input type="text" name="searchName"
                            placeholder="enter a name"
                            value={this.name} onChange={e => this.props.handleChange(e)}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default RoomFilter