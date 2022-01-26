import React from 'react';
import { Box } from 'react-bulma-components/full';
import { ChecklistSection } from '../../checklist/ChecklistSection';
import NoteIcon from './images/note.png';

export const MostImportantModule = ({
    tasks, 
    deleteTask, 
    markAsImportant, 
    markAsComplete, 
    toggleTaskDetails, 
    filter,
}) => {

    const handleBtnClick = event => {
        document.getElementById('checklistLinkBtn').click();
    }

    return (
    <Box className="mostImportantModule module">
        <div className="module__headerContainer">
            <span className="module__imgContainer">
                <img alt="noteIcon" src={NoteIcon}/>
            </span>
            <span className="module__subtitle subtitle">Most Important Tasks</span>
            <span className="module__view-all" onClick={() => { handleBtnClick() }}>View all</span>
        </div>
        <ChecklistSection 
            section="important"
            important={1}
            status={0}
            dependant={0}
            tasks={tasks}
            deleteTask={deleteTask}
            markAsImportant={markAsImportant}
            markAsComplete={markAsComplete}
            toggleTaskDetails={toggleTaskDetails}
            filter={filter}
            limit={5}
        />   
    </Box>
    )
    
}