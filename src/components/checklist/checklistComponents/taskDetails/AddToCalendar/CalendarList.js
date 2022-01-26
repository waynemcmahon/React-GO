import React, { Component } from 'react';
import { Modal, Content, Button } from 'react-bulma-components/full';
import { FaWindows, FaGoogle, FaApple } from 'react-icons/fa';
import { Event }  from '../../../../tracking';

export default class CalendarList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calendars: this.props.children,
            show: this.props.show,
            onClose: this.props.onClose,
            //onClick: this.props.onClick
        };
        
    }
    componentDidMount() {
       /*  const link = document.getElementById("modal__Calendar__Link");
        console.log(link);
       link.addEventListener('modal__Calendar__Link', this.sendEvent);
        console.log(this.props);  */
    }

    componentWillUnmount() {
        //let link = document.getElementById("modal__Calendar__Link");
        //link.removeEventListener('modal__Calendar__Link', this.sendEvent);
    }

    render(){
        let calendar_icon = {};
        return(
        <Modal 
            show={true} 
            onClose={this.state.onClose}
            closeModal={this.state.onClose} 
            modal={{ closeOnBlur: true }}
            modalState={true} 
            className="modal__addToCalendar"
            showClose={false}
            closeOnBlur={true}
        >
            <Modal.Card>
                <Modal.Card.Head>
                <Modal.Card.Title style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <strong>Add a calendar reminder for this task</strong>
                </Modal.Card.Title>
                </Modal.Card.Head>
                <Modal.Card.Body>
                    <Content>
                        {/* {this.state.calendars} */}
                        {
                            this.state.calendars.map(function(item, i){
                                if(item.key === "Google"){ calendar_icon = <FaGoogle/>}
                                else if(item.key === "Outlook"){ calendar_icon = <FaWindows/>}
                                else if(item.key === "iCal"){ calendar_icon = <FaApple/>}
                                return <div key={i} className="calendarLink__Container" onClick={() => { Event("GO Task", "Calendar event added", item.key); }}><span className="calendarLink__Image">{calendar_icon}</span>{item}</div>
                            })
                        }    
                        <Button className="modal__addToCalendar__Button" onClick={() => { this.props.close() }}>Cancel</Button>
                    </Content>
                </Modal.Card.Body>
            </Modal.Card>
        </Modal>
        )
       
    }
}