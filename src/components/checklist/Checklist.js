import React, {useState, useEffect } from 'react';
import { ChecklistSection } from './ChecklistSection';
import { ChecklistTabs } from './checklistComponents/checklistTabs/ChecklistTabs';
import { Columns, Icon, Panel, Box} from "react-bulma-components/full";
import { TaskDetails } from './checklistComponents/taskDetails/TaskDetails'; 
import { AddTaskPanel } from './checklistComponents/addTask/AddTaskPanel';

export const Checklist = ({
    tasks, 
    tasksInit,
    defaultTasks,
    deleteTask, 
    addDate,
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
    changeBreadcrumb,
    showNotification,
    showNotesNotification,
    checkboxLoading
}) => {
    let link = [
        {"title" : "Dashboard", "active" : false, "link" : "dashboard"},
        {"title" : "Checklist", "active" : true, "link" : "checklist"},
    ];

    let title = "Checklist";
     useEffect(() => {
        changeHeaderText(title);
    }, [changeHeaderText, title]); 

    useEffect(() => {
        changeBreadcrumb(link);
    }, [changeBreadcrumb]); 

    let importantHide = false;
    let completedHide = false;
    let todosHide = false;
    let upcomingHide = false;
    let mostImportantHideClass= "checklistSection";

    const [mostImportantHide, setMostImportantHide] = useState(false);
    const [otherTasksHide, setOtherTasksHide] = useState(false);
    const [completedTasksHide, setCompletedTasksHide] = useState(false);
    const [upcomingTasksHide, setUpcomingTasksHide] = useState(false);
    
   /*  useEffect(() => {
        setMostImportantHide(userHide);
    }, [userHide]);  */

    if (filter === "Most Important") {
        completedHide = true;
        todosHide = true;
        upcomingHide = true;
    }
    else if (filter === "Completed") {
        importantHide = true;
        todosHide = true;
        upcomingHide = true
    }
    else if (filter === "Other Tasks") {
        importantHide = true;
        completedHide = true;
        upcomingHide = true
    }
    else if (filter === "Upcoming Tasks") {
        importantHide = true;
        completedHide = true;
        todosHide = true
    }

    const collapseSection = (e) => {
        if (e === "important") {
            setMostImportantHide(!mostImportantHide);
        }
        else if (e === "other") {
            setOtherTasksHide(!otherTasksHide);
        }
        else if (e === "completed") {
            setCompletedTasksHide(!completedTasksHide);
        }
        else if(e === "upcoming"){
            setUpcomingTasksHide(!upcomingTasksHide);
        }
    }

    /* const sections =[
        {section:"complete", status:parseInt(task.status), dependant:!dependant}
      ] */
    return (
      <div className="content" data-testid="content">       
        <Columns.Column>
            <ChecklistTabs 
                filterByStage={filterByStage}
                filterByCategory={filterByCategory}
                tabIndex={tabIndex}
                activeTab={activeTab}
                toggleAddTask={toggleAddTask}
                addTaskVisible={addTaskVisible}
                sortBy={sortBy}
                filterBy={filterBy}
                sort={sort}
                tabStages={tabStages}
                tabCategories={tabCategories}
            />
            <Box className="checklistContainer">
                <div className={importantHide ? "checklistSection checklistSection__Important sectionHide" : "checklistSection checklistSection__Important"}>
                    <div onClick={() => collapseSection("important")}>
                        <Panel.Block renderAs="a">
                            <Panel.Icon renderAs={Icon} icon="angle-down" className={mostImportantHide ? "rotate" : ""}
                        />
                            Most Important   
                        </Panel.Block>
                    </div>  
                    <div className={mostImportantHide ? "sectionHide" : ""}>
                        <ChecklistSection 
                            section="important"
                            important={1}
                            status={0}
                            dependant={0}
                            tasks={tasks}
                            defaultTasks={defaultTasks}
                            deleteTask={deleteTask}
                            markAsImportant={markAsImportant}
                            markAsComplete={markAsComplete}
                            toggleTaskDetails={toggleTaskDetails}
                            filter={filter}
                            checkboxLoading={checkboxLoading}
                        /> 
                    </div>
                        
                </div>
                <div className={todosHide ? "checklistSection checklistSection__todo sectionHide" : "checklistSection checklistSection__todo"} >
                    <div onClick={() => collapseSection("other")}>
                        <Panel.Block renderAs="a">
                            <Panel.Icon renderAs={Icon} icon="angle-down" className={otherTasksHide ? "rotate" : ""}/>
                            Other Tasks
                        </Panel.Block>
                    </div>
                    <div className={otherTasksHide ? "sectionHide" : ""}>
                        <ChecklistSection 
                            section="todos"
                            //important={0}
                            status={0}
                            dependant={false}
                            tasks={tasks}
                            defaultTasks={defaultTasks}
                            deleteTask={deleteTask}
                            markAsImportant={markAsImportant}
                            markAsComplete={markAsComplete}
                            toggleTaskDetails={toggleTaskDetails}
                            filter={filter}
                            checkboxLoading={checkboxLoading}
                        />
                    </div>
                    
                </div>
                <div className={upcomingHide ? "checklistSection checklistSection__todo sectionHide" : "checklistSection checklistSection__todo"} >
                    <div onClick={() => collapseSection("upcoming")}>
                        <Panel.Block renderAs="a">
                            <Panel.Icon renderAs={Icon} icon="angle-down" className={upcomingTasksHide ? "rotate" : ""}/>
                                Upcoming Tasks
                        </Panel.Block>
                    </div>
                    <div className={upcomingTasksHide ? "sectionHide" : ""}>
                        <ChecklistSection 
                            section="upcoming"
                            status={0}
                            dependant={true}
                            tasks={tasks}
                            defaultTasks={defaultTasks}
                            deleteTask={deleteTask}
                            markAsImportant={markAsImportant}
                            markAsComplete={markAsComplete}
                            toggleTaskDetails={toggleTaskDetails}
                            filter={filter}
                            checkboxLoading={checkboxLoading}
                        />
                    </div>
                    
                </div>
                <div className={completedHide ? "checklistSection checklistSection__Completed sectionHide" : "checklistSection checklistSection__Completed"}>
                    <div onClick={() => collapseSection("completed")}>
                        <Panel.Block renderAs="a">
                            <Panel.Icon renderAs={Icon} icon="angle-down" data-action="collapse" className={completedTasksHide ? "rotate" : ""}/>
                            Completed
                        </Panel.Block>
                    </div>
                    <div className={completedTasksHide ? "sectionHide" : ""}>
                        <ChecklistSection 
                            section="complete"
                            status={1}
                            tasks={tasks}
                            defaultTasks={defaultTasks}
                            deleteTask={deleteTask}
                            markAsImportant={markAsImportant}
                            markAsComplete={markAsComplete}
                            toggleTaskDetails={toggleTaskDetails}
                            filter={filter}
                            className={mostImportantHideClass}
                            checkboxLoading={checkboxLoading}
                        />
                    </div>
                    
                </div> 
            </Box>                   
        </Columns.Column>   

        {
        taskDetailsVisible?

        <TaskDetails 
            tasks={tasksInit}
            markAsComplete={markAsComplete}
            markAsImportant={markAsImportant}
            taskDetailsTask={taskDetailsTask}
            taskResources={taskResources}
            taskDetailsVisible={taskDetailsVisible}
            toggleTaskDetails={toggleTaskDetails}
            deleteTask={deleteTask}
            addDate={addDate}
            changeNoteState={changeNoteState}
            showNotification={showNotification}
            showNotesNotification={showNotesNotification}
        />

        :

        <div></div> 
        }

        
        {/* <TaskDetails 
            markAsComplete={markAsComplete}
            markAsImportant={markAsImportant}
            taskDetailsTask={taskDetailsTask}
            taskResources={taskResources}
            taskDetailsVisible={taskDetailsVisible}
            toggleTaskDetails={toggleTaskDetails}
            deleteTask={deleteTask}
        />  */} 

        {
        addTaskVisible?

        <AddTaskPanel 
            addTaskVisible={addTaskVisible}
            addTask={addTask}
            toggleAddTask={toggleAddTask}
        />

        :

        <div></div>
        } 

        {/* <AddTaskPanel 
            addTaskVisible={addTaskVisible}
            addTask={addTask}
            toggleAddTask={toggleAddTask}
        /> */}


                    

                    
      </div>
      
    )
}