import React, { useRef, useEffect } from "react";
import { Box } from 'react-bulma-components/full';
import { FaTimesCircle } from 'react-icons/fa';
import AddTask from './AddTask';
//import { Notification } from 'react-bulma-components/full'; 

export const AddTaskPanel = ({addTaskVisible, toggleAddTask, addTask}) => {
    var visibility = "hide";
    if (addTaskVisible) {
        visibility = "show";
      }

      const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        visibility = "hide";
        console.log("hide");
        toggleAddTask();
      };

      const node = useRef();

      useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);
    return(
        <div ref={node}>
            <Box className={"taskDetails " + visibility}>
                <header className="taskDetails__header">
                    <div className="taskDetails__title">
                        <p className="title">Let's build your task</p>
                    </div>
                    <div className="taskDetails__close">
                        <span className="close">
                            <FaTimesCircle size={30} onClick={() => {toggleAddTask()}}/>
                        </span>
                    </div>                    
                </header>

                <div className="taskDetails__body">
                    <AddTask addTask={addTask} />
                </div>
            </Box>
        </div>
        
    )
}