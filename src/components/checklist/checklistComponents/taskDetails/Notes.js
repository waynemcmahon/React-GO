import React, { useState, useEffect } from 'react';
import { Button } from 'react-bulma-components/full';
import axios from 'axios';
import { addNotes } from '../../../data/GetData';
import { Event } from '../../../tracking';

export const Notes = ({task, tasks, taskId, changeNoteState, showNotification, showNotesNotification}) => {
    
    if(task.notes === null){
        task.notes = "";
    }
    
    const [note, setNote] = useState({
        value: task.notes,
    });
    
    useEffect(() => {
        setNote(task.notes);
    }, [task.notes]); 

    const handleSubmit = event => {
        event.preventDefault();
        let taskNote = {};
        let name;
        taskNote.id = task.id;
        taskNote.notes = note; 
        let text = "Your note has been saved";
        //showNotification(text.toString());

        axios.post(addNotes, { taskNote })
        .then(res => {
            tasks.filter(task1 => {
                if(task1.id === task.id) {
                    task1.notes = note;
                }
                return task1;
            });
            showNotesNotification();
            var search = "User";  
            if (task.category.indexOf(search) > -1)
            { 
                name = "User Task";
            }
            else{
                name = task.name
            }

            Event("GO Task", "Note Added", name);  
        })
        
    }

    return (
        <div className="taskDetails__body__notes">
            <p className="title">Notes</p>
            <form onSubmit={
                handleSubmit
                }>
                <textarea name="notes" value={note} onChange={ event => setNote(event.target.value) } className="taskDetails__body__notes__textarea"/>
                <div className="taskDetails__body__notes_btn_container">
                    <Button type="submit">Add Note</Button>
                </div>                    
            </form>
        </div>
    )

    }