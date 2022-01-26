import React from 'react';
import { Box } from 'react-bulma-components/full';
import { FaCaretRight, FaRegClock as FaClock } from "react-icons/fa";
import { ChecklistSection } from '../../checklist/ChecklistSection';
//import NoteIcon from './images/notes.png';

export const UpcomingTasksModule = ({
    tasks, 
    deleteTask, 
    markAsImportant, 
    markAsComplete, 
    toggleTaskDetails, 
    filter,
}) => {
    let cta = <p className="module__view-all_arrow red uppercase bold-heavy" onClick={() => { handleBtnClick("notes") }}>View your most recently updated notes<FaCaretRight className="arrow-right" /></p>

    tasks = tasks.filter(task => {
        return task.date !== "" && task.date !== null;
    })

    if(tasks.length === 0){
        cta = <p className="module__view-all_arrow red uppercase bold-heavy" onClick={() => { handleBtnClick("checklist") }}>Go to your checklist to start adding notes<FaCaretRight className="arrow-right" /></p>
    }

    const handleBtnClick = event => {
        if(event === "checklist"){
            document.getElementById('checklistLinkBtn').click();
        }
        else{
            document.getElementById('notesLinkBtn').click();
        }
        
    }

    return (
    <Box className="module notesModule">
        <div className="module__headerContainer">
            <span className="module__imgContainer">
                <FaClock/>
            </span>
            <p className="module__subtitle subtitle">Deadlines & Reminders</p> 
        </div>
        <div className="notesText">
            <p>Here are your upcoming tasks</p>
        </div>
        <ChecklistSection 
            section="nextDate"
            tasks={tasks}
            deleteTask={deleteTask}
            markAsImportant={markAsImportant}
            markAsComplete={markAsComplete}
            toggleTaskDetails={toggleTaskDetails}
            filter={filter}
            limit={5}
        />   
       {/*  {cta} */}
    </Box>
    )
    
}