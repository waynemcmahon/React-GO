import React, { useEffect } from 'react';
import { NotesChecklist } from './NotesChecklist';

export const NotesView = ({
    //tasks, 
    tasksInit,
    defaultTasks,
    deleteTask, 
    markAsImportant, 
    markAsComplete, 
    addTask, 
    filterByStage, 
    filterByCategory,
    toggleTaskDetails, 
    taskDetailsTask, 
    taskResources,
    taskDetailsVisible, 
    tabIndex, 
    activeTab, 
    toggleAddTask,
    addTaskVisible,
    sortBy,
    sort,
    filter,
    tabStages,
    tabCategories,
    filterBy,
    changeNoteState,
    changeHeaderText,
    changeBreadcrumb
}) => {

    let link = [
        {"title" : "Dashboard", "active" : false, "link" : "dashboard"},
        {"title" : "Notes", "active" : true, "link" : "notes"},
    ];
     useEffect(() => {
        changeBreadcrumb(link);
    }, [changeBreadcrumb]); 

    let title = "Your Notes";
     useEffect(() => {
        changeHeaderText(title);
    }, [changeHeaderText, title]);

    let tasks = tasksInit.filter(task => {
        return task.notes !== "";
    })

    const handleBtnClick = event => {
        document.getElementById('checklistLinkBtn').click();
    }

    return(
        <div className="notesView__Container">
            {
                tasks.length === 0 ? <label>You don't have any tasks with a note, head to <span className="link" onClick={() => { handleBtnClick() }}>checklist</span> to start adding some.</label>

                :

                <NotesChecklist 
                    tasks={tasks}
                    tasksInit={tasksInit}
                    deleteTask={deleteTask}
                    markAsImportant={markAsImportant}
                    markAsComplete={markAsComplete}
                    addTask={addTask}
                    filterByStage={filterByStage}
                    filterByCategory={filterByCategory}
                    tabIndex={tabIndex}
                    activeTab={activeTab}
                    toggleTaskDetails={toggleTaskDetails}
                    taskDetailsVisible={taskDetailsVisible}
                    taskResources={taskResources}
                    taskDetailsTask={taskDetailsTask}
                    toggleAddTask={toggleAddTask}
                    addTaskVisible={addTaskVisible}
                    sortBy={sortBy}
                    filterBy={filterBy}
                    sort={sort}
                    filter={filter}
                    tabStages={tabStages}
                    tabCategories={tabCategories}
                    changeNoteState={changeNoteState}
                />
            }
        </div>
    )
}