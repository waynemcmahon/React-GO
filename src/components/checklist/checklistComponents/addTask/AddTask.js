import React, { Component } from 'react';
import { Button, Dropdown, Form } from 'react-bulma-components/full';
import DatePicker from 'react-date-picker';

export default class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskName: "",
            stage: "Getting Ready",
            important: "",
            category: "Immigration",
            displayBtn: false,
            date: "",
            addDate: "No",
            displayDateType: false,
            dateType: "Event"
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStageChange = this.handleStageChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleImportantChange = this.handleImportantChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
       
    }

    handleNameChange = (e) => {
        this.setState({ taskName: e.target.value });

        if(this.state.taskName !== "" && this.state.stage !== "" && this.state.important !== "" && this.state.category !== ""){
            this.setState({ 
                displayBtn: true,
            });
        }

        console.log(this.state);
    }

    handleStageChange = (e) => {
        this.setState({ 
            stage: e,
        });

        if(this.state.taskName !== "" && this.state.important !== "" && this.state.category !== ""){
            this.setState({ 
                displayBtn: true,
            });
        }
        console.log(this.state);
    }

    handleCategoryChange = (e) => {
        this.setState({ 
            category: e,
        });

        if(this.state.taskName !== "" && this.state.stage !== "" && this.state.important !== ""){
            this.setState({ 
                displayBtn: true,
            });
        }
        console.log(this.state);
    }

    handleImportantChange = (e) => {
        this.setState({ 
            important: e.target.value
        });

        if(this.state.taskName !== "" && this.state.stage !== "" && this.state.category !== ""){
            this.setState({ 
                displayBtn: true,
            });
        }
        console.log(this.state);
    }

    handleAddDateChange = (e) => {
        this.setState({ 
            displayDateType: !this.state.displayDateType,
            addDate: e.target.value
        })

        if(e.target.value="Yes"){
            this.setState({ 
                date: new Date(),
            })
        }
        else{
            this.setState({ 
                date: ""
            })
        }
    }
    
    handleDateTypeChange = (e) => {
        /* let dateType = "0"
        if(e === "Deadline"){
            dateType = "1"
        } */
        this.setState({ 
            dateType: e,
        });
        console.log(this.state.dateType);
    }

    handleDateChange = (date) => {
        this.setState({ 
            date
        })
    }

    

    render() {
        console.log(this.state.date)
        return (
            <div className="addTask__Container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.addTask({task : this.state})
                    this.setState({
                        taskName: "",
                    }) 
                    }}>
                    <Form.Field>
                        <Form.Label>What task is coming up? Please provide a short name here.</Form.Label>
                        <Form.Control>
                            <input type="text" value={this.state.taskName} onChange={this.handleNameChange} />        
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Which stage of your journey does this task relate to?</Form.Label>
                        <Form.Control>
                        <Dropdown
                            value={this.state.stage}
                            onChange={this.handleStageChange}  
                        >
                            <Dropdown.Item value="Getting Ready" >
                                Getting Ready
                            </Dropdown.Item>
                            <Dropdown.Item value="Landing Week">
                                Landing Week
                            </Dropdown.Item>
                            <Dropdown.Item value="In Canada">
                                In Canada
                            </Dropdown.Item>
                        </Dropdown>
                        </Form.Control> 
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Which category is most appropriate for your new task?</Form.Label>
                        <Form.Control>
                        <Dropdown
                            value={this.state.category}
                            onChange={this.handleCategoryChange}
                        >
                            <Dropdown.Item value="Immigration" >
                                Immigration
                            </Dropdown.Item>
                            <Dropdown.Item value="Employment">
                                Employment
                            </Dropdown.Item>
                            <Dropdown.Item value="Planning">
                                Planning
                            </Dropdown.Item>
                            <Dropdown.Item value="Living">
                                Living
                            </Dropdown.Item>
                        </Dropdown>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Is this one of your most important tasks?</Form.Label>
                        <Form.Control>
                            <Form.Radio onChange={this.handleImportantChange} checked={this.state.important === 'Yes'} value="Yes" name="question">
                            Yes
                            </Form.Radio>
                            <Form.Radio onChange={this.handleImportantChange} checked={this.state.important === 'No'} value="No" name="question" >
                            No
                            </Form.Radio>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Field className="formSubField">
                            <Form.Label>Add a date/deadline to your task?</Form.Label>
                            <Form.Control>
                                <Form.Radio onChange={this.handleAddDateChange} checked={this.state.addDate === 'Yes'} value="Yes" name="addDate">
                                Yes
                                </Form.Radio>
                                <Form.Radio onChange={this.handleAddDateChange} checked={this.state.addDate === 'No'} value="No" name="addDate" >
                                No
                                </Form.Radio>
                            </Form.Control>
                        </Form.Field>
                        {
                            this.state.displayDateType ?
                            <React.Fragment>
                                <Form.Field className="formSubField formFieldDatePicker">
                                    <Form.Control>
                                        <DatePicker 
                                            onChange={this.handleDateChange}
                                            value={this.state.date}
                                        />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field className="formSubField">
                                    <Form.Label>Is this an event or deadline?</Form.Label>
                                    <Form.Control>
                                    <Dropdown
                                        value={this.state.dateType}
                                        onChange={this.handleDateTypeChange}
                                    >
                                        <Dropdown.Item value="Event">
                                            Event
                                        </Dropdown.Item>
                                        <Dropdown.Item value="Deadline">
                                            Deadline
                                        </Dropdown.Item>
                                    </Dropdown>
                                    </Form.Control>
                                </Form.Field>
                            </React.Fragment>
                            :
                            <React.Fragment></React.Fragment>
                        }
                    </Form.Field>
                    {/* {
                    this.state.displayDateType ?
                    <Form.Field>
                        <Form.Label>Is this an event or deadline?</Form.Label>
                        <Form.Control>
                        <Dropdown
                            value={this.state.dateType}
                            onChange={this.handleDateTypeChange}
                        >
                            <Dropdown.Item value="Event">
                                Event
                            </Dropdown.Item>
                            <Dropdown.Item value="Deadline">
                                Deadline
                            </Dropdown.Item>
                        </Dropdown>
                        </Form.Control>
                    </Form.Field>
                    : 
                    <React.Fragment></React.Fragment>
                    } */}
                    
                    
                    {
                    this.state.displayBtn ?

                    <Button type="submit" className="addTask__Button">Add Task</Button>

                    :
                    <React.Fragment></React.Fragment>
                    }
                </form>
            </div>
        )

    }
}