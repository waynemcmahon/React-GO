import React, { Component } from 'react';
import { Dropdown } from "react-bulma-components/full";

export default class SortByButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortBy: 'Timeline',
            selected: ''
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (e) => {
        console.log(e);
        this.setState({ sortBy: e });
        this.props.sortBy({sortBy: e});
    }

    render() {
        return (
            <div className="field checklistBtns__Sort">
                <Dropdown
                    onChange={this.handleChange}
                    value={this.state.sortBy} 
                >
                    <Dropdown.Item value="Timeline">
                        Timeline
                    </Dropdown.Item>
                    <Dropdown.Item value="Category">
                        Category
                    </Dropdown.Item>
                </Dropdown>
            </div>
            
        )

    }
}