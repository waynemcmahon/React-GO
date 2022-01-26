import React from 'react';
import AddToCalendarHOC, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import { Button } from 'react-bulma-components/full';
import moment from 'moment';
import 'moment-timezone';
import CalendarList from "./CalendarList";
import { TaskDetails } from '../TaskDetails';
import he from 'he';


export class AddToCalendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            event: {
                description: TaskDetails.message,
                duration: "2",
                endDatetime: "20200215T135449+00:00",
                //location: 'NYC',
                startDatetime: "20200215T115449+00:00",
                title: TaskDetails.name,
            },
            modalOpen: false
        }
    }

    componentDidMount() {
        const startDatetime = moment().utc().add(0, 'days');
        const endDatetime = startDatetime.clone().add(2, 'hours');
        //const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();  
        //let description = this.props.taskDetails.message.replace(/<[^>]+>/g, '');
        const regex = /(<([^>]+)>)/ig;
        const regexNewline = this.props.taskDetails.message.replace(/\n/g, ' ')
        const result = regexNewline.replace(regex, ''); 
        this.setState({
            event: {
                //description: he.decode(this.props.taskDetails.message),
                description: "To view the details of this task, please visit <a href='https://moving2canada.com/go'>GO</a>",
                duration: moment.duration(endDatetime.diff(startDatetime)).asHours().toString(),
                endDatetime: endDatetime.format('YYYYMMDDTHHmmssZ'),
                //location: 'NYC',
                startDatetime: startDatetime.format('YYYYMMDDTHHmmssZ'),
                title: he.decode(this.props.taskDetails.name),
            }
        })     
                
    }

    close = () => {
        this.setState({ modalOpen: false }); 
    }

    render(){
        const AddToCalendarModal = AddToCalendarHOC(Button, CalendarList);
        const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        return(
            <AddToCalendarModal
                className="addToCalendar__Container"
                event={this.state.event}
                items={isiOS ? [SHARE_SITES.ICAL, SHARE_SITES.GOOGLE] : [SHARE_SITES.GOOGLE, SHARE_SITES.OUTLOOK]}
                //items={[SHARE_SITES.GOOGLE]}
                buttonText="Add To Calendar"
                dropdownProps={{
                    show: true,
                    onClose: this.close,
                    className: "modal__Calendar",
                    modalState: true,
                    close: this.close
                }}
                linkProps={{
                    className: "modal__Calendar__Link"
                  }}
                filename={this.props.taskDetails.name}
            />
       )
    }
}