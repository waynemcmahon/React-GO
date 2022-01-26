import React, { useRef, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Box, Content, Button, Notification, Modal, Form} from 'react-bulma-components/full';
import { FaTimesCircle, FaRegCalendarPlus as FaCalendar } from 'react-icons/fa';
import { Checkbox } from '../checklistItem/Checkbox';
import { MarkAsImportant } from "../checklistItem/MarkAsImportant";
import { RelatedResources } from "./RelatedResources";
import { Categories } from "./Categories";
import { Notes } from "./Notes";
//import { LoadingIcon } from "../../../elements/LoadingIcon";
import { AddToCalendar } from './AddToCalendar/AddToCalendar';
import { TaskDate } from '../TaskDate';
import DatePicker from 'react-date-picker';


export const TaskDetails = ({ tasks, toggleTaskDetails, taskDetailsVisible, showNotesNotification, taskDetailsTask, taskResources, markAsComplete, markAsImportant, deleteTask, addDate, changeNoteState, showNotification}) => {

    let dependencyList = [];
    let dependencyText = "";
    let hideClass = "";
    let readOnly = false
    var visibility = "hide";

    if (taskDetailsVisible) {
        visibility = "show";
    }

    if(taskDetailsTask.dependent !== undefined){
        if(taskDetailsTask.dependent !== ""){
            dependencyList = taskDetailsTask.dependent.split(',');
            let comma = dependencyList.length > 1 ? "," : "";
            dependencyList.forEach( dep => {
                tasks.map(task => {
                    if(parseInt(dep) === task.taskId && task.status === 0){
                        dependencyText += task.name + comma;
                        readOnly = true
                    }

                    return task;
                })
            })
        }
    }

    const [date, setDate] = useState({
        value: new Date(),
    });
    
    useEffect(() => {
        setDate(date);
    }, [date]); 

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        visibility = "hide";
        toggleTaskDetails(taskDetailsTask);
    };

    const handleAddDateChange = e => {
        setDate(e);
        console.log(e);
    }

    const node = useRef();

    useEffect(() => {
        // add when mounted
        document.getElementById('app-root').addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.getElementById('app-root').removeEventListener("mousedown", handleClick);
        };
      }, []);
    
    return(
        <div ref={node}>
            <Box className={"taskDetails " + visibility} >
            <header className="taskDetails__header">
                <MarkAsImportant 
                    taskDetailsTask={taskDetailsTask}
                    markAsImportant={markAsImportant}
                    tasks={tasks}
                />
                <div className="taskDetails__title">
                    <p className="title">Task Details</p>
                </div>
                <div className="taskDetails__close">
                    <span className="close">
                        <FaTimesCircle size={30} onClick={() => {toggleTaskDetails(taskDetailsTask)}}/>
                    </span>
                </div>
                    
            </header>

            <div className="taskDetails__body">
            {
                    readOnly ?

                    <Notification>
                        You need to complete the following tasks first: <span className="taskList"><strong><div dangerouslySetInnerHTML={{ __html: dependencyText }} /></strong></span>
                    </Notification>

                    :

                    <div></div> 
                    }
                
                <div className="taskDetails__body__header">
                    <div className={hideClass} >
                        <Checkbox 
                            task={taskDetailsTask}
                            markAsComplete={markAsComplete}   
                            tasks={tasks}        
                        />
                    </div>
                    
                    <div className="taskDetails__name">
                        <div className="title" dangerouslySetInnerHTML={{ __html: taskDetailsTask.name }} />
                    </div>                                       
                </div>
                <div className="taskDetails__date">
                    {/* <TaskDate
                        date={taskDetailsTask.date}
                        dateType={taskDetailsTask.dateType}
                        showEditButton={true}
                        showAddButton={true}
                    /> */}
                </div> 
                <div className="taskDetails__body_message">
                    <Content className="taskDetails__body__message">
                        <div dangerouslySetInnerHTML={{ __html: taskDetailsTask.message }} />
                        <Categories 
                            categories={taskDetailsTask.category}
                        />
                    </Content>                    
                </div>        
                <div className="taskDetails__body__related">
                    <RelatedResources
                        taskDetailsTask={taskDetailsTask}
                        taskResources={taskResources}
                    />
                </div>                   
                <div className="taskDetails__body_addToCalendar">             
                    <AddToCalendar taskDetails={taskDetailsTask}/>
                    <FaCalendar/>
                </div>   
                {taskDetailsTask.mandatory !== 1  ?
                    (
                        <div className={hideClass}>
                            {/* <LoadingIcon></LoadingIcon> */}
                            <div className="taskDetails__body__not_relevant">
                                <div className="taskDetails__body__not_relevant_text">
                                    <span>This task is not relevant to me</span>
                                </div>
                                <div className="taskDetails__body__not_relevant_btn">
                                    <Button onClick={() => {deleteTask(taskDetailsTask.id)}}>Remove</Button> 
                                    
                                </div>                                
                            </div>
                        </div>
                    
                    )
                    :
                    (
                        <div className="taskDetails__body__not_relevant">
                            <label>This task is mandatory</label>
                        </div>
                    )
                }
                
            </div>

            <footer className="taskDetails__footer">                
                <div className="taskDetails__footer__notes">                           
                    <Notes 
                        task={taskDetailsTask}
                        taskId={taskDetailsTask.id}
                        tasks={tasks}
                        changeNoteState={changeNoteState}
                        showNotification={showNotification}
                        showNotesNotification={showNotesNotification}
                    />     
                    
                </div>
            </footer>
        </Box>
        </div>       
       
    )
}