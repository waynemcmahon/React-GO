import React, { Component } from 'react';
import { Dropdown } from "react-bulma-components/full";

export default class FilterByButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterBy: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({ filterBy: e});
        this.props.filterBy({filterBy: e});
    }
    

    render() {
        return (
            <div className="field checklistBtns__Filter">
                <Dropdown
                    onChange={this.handleChange} 
                    value={this.state.filterBy} 
                >
                    <Dropdown.Item value="Filter" >
                        Filter By
                    </Dropdown.Item>
                    <Dropdown.Item value="Most Important">
                        Most Important
                    </Dropdown.Item>
                    <Dropdown.Item value="Other Tasks">
                        Other Tasks
                    </Dropdown.Item>
                    <Dropdown.Item value="Upcoming Tasks">
                        Upcoming Tasks
                    </Dropdown.Item>
                    <Dropdown.Item value="Completed">
                        Completed
                    </Dropdown.Item>
                </Dropdown>
            </div>
        )
    }
}