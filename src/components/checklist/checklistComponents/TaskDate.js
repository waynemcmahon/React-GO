import React, { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';
import DatePicker from 'react-date-picker';


export const TaskDate = ({date, dateType, showEditButton, showAddButton}) => {     
    const calendarStrings = {
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[Last] dddd',
        nextWeek : 'dddd',
        sameElse : 'MMMM D'
    };

    const getDate = new Date(),
    currentDate = getDate.getFullYear() + "-" + ("0" + (getDate.getMonth() + 1)).slice(-2) + "-" + getDate.getDate(),
    tomorrowDate = getDate.getFullYear() + "-" + ("0" + (getDate.getMonth() + 1)).slice(-2) + "-" + (getDate.getDate() + 1);
    let dateClass;
    if (date == currentDate) {
        dateClass = "today";
    } else if (currentDate > date) {
        dateClass = "past";
    } else if  (tomorrowDate == date){
        dateClass = "tomorrow";
    }else {
        dateClass = "future";
    }


    const [newDate, setDate] = useState({
        value: new Date(),
    });

    /* const [isOpen, setIsOpen] = useState({
        value: false,
    }); */

    /* useEffect((e) => {
        setIsOpen();
        console.log(isOpen);
    }, [isOpen]);
 */

    const buttonRef = useRef();

    useEffect(() => {
        setDate(date);
    }, [date]);
   

    const handleAddDateChange = e => {
        const getDate = e,
              date = getDate.getFullYear() + "-" + ("0" + (getDate.getMonth() + 1)).slice(-2) + "-" + getDate.getDate();
        setDate(date);
    }

    const [isOpen, setIsOpen] = useState(false); // initialize state

    function changeState() { 
        setIsOpen(!isOpen); // change state
    }

    const handleBtnClick = e => {
        //document.getElementById('editDate').click();
        //setIsOpen(true);
        setIsOpen(!isOpen);
    }

    const handleOnClose = e => {
        setIsOpen(false);
    }

    return(        
        <React.Fragment>
        {
            date && date !== "0000-00-00" ?
            <span className="checklistTaskDate">
            {dateType === 1 ? <span>Due </span> : <React.Fragment></React.Fragment>}
            <Moment 
                local
                calendar={calendarStrings}
                //style={isPast ? {color:"red"} : {}}
                className={dateClass ? dateClass : ""}
                onChange={() => { handleBtnClick() }}
            >                      
                {newDate}
            </Moment>
            {showEditButton ? <span className="checklistTaskDate__editDate"  onClick={() => { handleBtnClick() }}>Edit</span> : <React.Fragment></React.Fragment>}
            
            <DatePicker 
                value={newDate.value}
                onChange={handleAddDateChange}
                clearIcon={null}
                isOpen={isOpen}
                ref={buttonRef}
                onClose={handleOnClose}
                onClick={() => {
                    console.log(buttonRef.current);
                  }}
            />
            </span>
            :
            showAddButton ? 
            <React.Fragment>
                <span className="checklistTaskDate__editDate"  onClick={() => { handleBtnClick() }}>Add Date</span> 
                <DatePicker 
                    value={newDate.value}
                    onChange={handleAddDateChange}
                    clearIcon={null}
                    isOpen={isOpen}
                    ref={buttonRef}
                    onClick={() => {
                        console.log(buttonRef.current);
                    }}
                />
            </React.Fragment>
            
            : 
            <React.Fragment></React.Fragment>
        }
        </React.Fragment>
    )
}
  
