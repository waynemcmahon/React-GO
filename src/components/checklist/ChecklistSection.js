import React from 'react';
import { Checkbox } from './checklistComponents/checklistItem/Checkbox';
import { TaskDate } from './checklistComponents/TaskDate' 
import { Button, Panel} from "react-bulma-components/full";
import { FaEllipsisH, FaPen } from "react-icons/fa";
import Moment from 'react-moment';

export const ChecklistSection = ({
  tasks, 
  status, 
  dependant,
  markAsComplete, 
  section, 
  toggleTaskDetails, 
  limit,
  checkboxLoading
}) => {

  if (limit === undefined) {
    limit = tasks.length;
  }
  let limitCount = 1;
  
  const calendarStrings = {
      lastDay : '[Yesterday]',
      sameDay : '[Today]',
      nextDay : '[Tomorrow]',
      lastWeek : '[Last] dddd',
      nextWeek : 'dddd',
      sameElse : 'MMMM D'
  };

  const date = new Date(),
  currentDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getDate(),
  tomorrowDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + (date.getDate() + 1);
  let dateClass;
  
const tasksList = tasks.length ? (
      tasks
      .sort((a, b) => parseInt(b.priority) - parseInt(a.priority))             
      .map(task => {
        if((
          section === "complete" && 
          parseInt(task.status) === status && 
          task.deleted !== 1 &&
          !dependant
         )){
          return (
            <Panel.Block key={task.id} className="is-collapsible">
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
              {/* {task.taskId} */}
              <Checkbox 
                task={task}
                tasks={tasks}
                markAsComplete={markAsComplete}  
                checkboxLoading={checkboxLoading}
              />          
              </div>
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                  {/* {"dependant: " + task.dependent + " | "}
                  {"important if: " + task.importantIfId} */}
                  <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                  {
                  task.date && task.date !== "0000-00-00" ?
                    <span className="checklistTaskDate">
                      {task.dateType === 1 ? <span>Due </span> : <React.Fragment></React.Fragment>}
                      <Moment 
                        local
                        calendar={calendarStrings}
                      >
                        {task.date}
                      </Moment>
                      </span>
                    :
                    <React.Fragment></React.Fragment>
                  }
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>
                <div className="checklistTaskBtn">
                  <Button onClick={() => {toggleTaskDetails(task)}}>
                    <FaEllipsisH/>
                  </Button>
                </div> 
              </div> 
            </Panel.Block>    
          )
          
        }
        else if(
          section === "important" &&
          parseInt(task.important) === 1 && 
          parseInt(task.status) === 0 && 
          parseInt(task.dependencyActive) === 0 &&
          task.deleted !== 1 &&
          limitCount <= limit
          ){
          limitCount++;
            if (task.date == currentDate) {
              dateClass = "today";
            } else if (currentDate > task.date) {
              dateClass = "past";
            } else if  (tomorrowDate == task.date){
              dateClass = "tomorrow";
            }else {
              dateClass = "future";
            }
          return (
            <Panel.Block key={task.id}>
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
              {/* {task.taskId} */}
               <Checkbox 
                  task={task}
                  tasks={tasks}
                  markAsComplete={markAsComplete}
                />          
              </div>            
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                {/* {"dependant: " + task.dependent + " | "}
                {"important if: " + task.importantIfId} */}
                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                {/* <TaskDate
                  date={task.date}
                  dateType={task.DateType}
                /> */}
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>    
                <div className="checklistTaskBtn">
                  <Button>
                    <FaEllipsisH/>
                  </Button>                
                </div> 
              </div>
              
            </Panel.Block>    
          )
        }
        else if(
          section === "todos" &&
          parseInt(task.important) === 0 && 
          parseInt(task.status) === 0 && 
          parseInt(task.dependencyActive) === 0 &&
          task.deleted !== 1){
          return (
            <Panel.Block key={task.id}>
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
              {/* {task.taskId} */}
               <Checkbox 
                  task={task}
                  tasks={tasks}
                  markAsComplete={markAsComplete} 
                />          
              </div>
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                {/* {"dependant: " + task.dependent + " | "}
                {"important if: " + task.importantIfId} */}
                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                {/* <TaskDate
                  date={task.date}
                  dateType={task.DateType}
                /> */}
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>
                <div className="checklistTaskBtn" is-pulled-right="true">
                  <Button>
                    <FaEllipsisH/>
                  </Button>                
                </div> 
              </div>
              
            </Panel.Block>    
          )
        }
        else if(
          section === "upcoming" &&
          parseInt(task.status) === 0 && 
          parseInt(task.dependencyActive) === 1 &&
          task.deleted !== 1){
          return (
            <Panel.Block key={task.id}>
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
               {/*  {task.taskId} */}
               <Checkbox 
                  task={task}
                  tasks={tasks}
                  markAsComplete={markAsComplete} 
                />          
              </div>
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                  {/* {"dependant: " + task.dependent + " | "}
                  {"important if: " + task.importantIfId} */}
                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                {/* <TaskDate
                  date={task.date}
                  dateType={task.DateType}
                /> */}
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>
                <div className="checklistTaskBtn" is-pulled-right="true">
                  <Button>
                    <FaEllipsisH/>
                  </Button>                
                </div> 
              </div>
              
            </Panel.Block>    
          )
        }
        else if(section === "notes"){
          return (
            <Panel.Block key={task.id}>
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
               {/*  {task.taskId} */}
               <Checkbox 
                  task={task}
                  tasks={tasks}
                  markAsComplete={markAsComplete} 
                />          
              </div>
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                  {/* {"dependant: " + task.dependent + " | "}
                  {"important if: " + task.importantIfId} */}
                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                {/* <TaskDate
                  date={task.date}
                  dateType={task.DateType}
                /> */}
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>
                <div className="checklistTaskBtn" is-pulled-right="true">
                  <Button>
                    <FaEllipsisH/>
                  </Button>                
                </div> 
              </div>
              
            </Panel.Block>    
          )
        }
        else if(section === "nextDate" &&
        parseInt(task.status) === 0 && 
        parseInt(task.dependencyActive) === 0 &&
        task.deleted !== 1){
          return (
            <Panel.Block key={task.id}>
              {/* {task.priority} */}
              <div className="checklistTaskCheckboxContainer">
               {/*  {task.taskId} */}
               <Checkbox 
                  task={task}
                  tasks={tasks}
                  markAsComplete={markAsComplete} 
                />          
              </div>
              <div className="checklistClickContainer" onClick={() => {toggleTaskDetails(task)}}>
                <div className="checklistTaskName">
                  {/* {"dependant: " + task.dependent + " | "}
                  {"important if: " + task.importantIfId} */}
                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: task.name }}/>
                {/* <TaskDate
                  date={task.date}
                  dateType={task.DateType}
                /> */}
                </div>
                <div className="checklistNoteIcon">
                {
                  task.notes !== "" ? 
                    <FaPen />
                  :
                  <React.Fragment></React.Fragment>
                }
                </div>
                <div className="checklistTaskBtn" is-pulled-right="true">
                  <Button>
                    <FaEllipsisH/>
                  </Button>                
                </div> 
              </div>
              
            </Panel.Block>    
          )
        }
        else return "";
      })
    ) : (
      <p>{/* You have no tasks left */}</p>
    )
    return (
      <div className="content" data-testid="content" id="checklistTaskList"> 
              {tasksList}
      </div>
    )
}