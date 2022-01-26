import React from 'react';

export const MarkAsImportant = ({ tasks, markAsImportant, taskDetailsTask }) => {
    let status = 0;
    if (!isNaN(taskDetailsTask.important)) {
        status = taskDetailsTask.important
    }
    return(
        <div className="markAsImportant">
            <input 
                type="checkbox" 
                className="completeTaskCheckbox"
                name="markImportant"
                id="markImportant"
                checked={status}
                onChange={() => {markAsImportant(taskDetailsTask.id)}}
            />
            <label htmlFor="markImportant"></label>
        </div>
    )
}