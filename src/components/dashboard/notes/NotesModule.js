import React from 'react';
import { Box } from 'react-bulma-components/full';
import { FaCaretRight } from "react-icons/fa";
import { ChecklistSection } from '../../checklist/ChecklistSection';
import NoteIcon from './images/notes.png';

export const NotesModule = ({
    tasks, 
    deleteTask, 
    markAsImportant, 
    markAsComplete, 
    toggleTaskDetails, 
    filter,
}) => {
    let cta = <p className="module__view-all_arrow red uppercase bold-heavy" onClick={() => { handleBtnClick("notes") }}>View your most recently updated notes<FaCaretRight className="arrow-right" /></p>

    tasks = tasks.filter(task => {
        return task.notes !== "" && task.notes !== null;
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
                <img alt="noteIcon" src={NoteIcon}/>
            </span>
            <p className="module__subtitle subtitle">Your Notes</p> 
        </div>
        <div className="notesText">
            <p>Keeping notes is a great way to manage a task before completing it</p>
        </div>
        <ChecklistSection 
            section="notes"
            tasks={tasks}
            deleteTask={deleteTask}
            markAsImportant={markAsImportant}
            markAsComplete={markAsComplete}
            toggleTaskDetails={toggleTaskDetails}
            filter={filter}
            limit={5}
        />   
        {cta}
    </Box>
    )
    
}