import React from 'react';
//import { LoadingIcon } from '../../../elements/LoadingIcon';

export const Checkbox = ({ tasks, task, markAsComplete, checkboxLoading }) => {
    let status = 0;
    if (!isNaN(task.status)) {
        status = task.status
    }
    
    let readOnly = false;
    if(task.dependant !== "" && task.dependant !== undefined){
        let dependencyList = [];
        
        dependencyList = task.dependant.split(',');
        dependencyList.forEach( dep => {
            tasks.map(task => {
                if(parseInt(dep) === task.taskId && task.status === 0){
                    readOnly = true;
                }
                return;
            })
            return;
        })
    } 

    if (task.dependencyActive === 1) {
        readOnly = true;
    }
    return(
        <div className={readOnly ? "checkbox-container readOnly" : "checkbox-container"}>
            <div className="readOnly-overlay"></div>
            <label >
            {
                readOnly === false ?
                <React.Fragment>
                    {/* <span>{task.id}</span> */}
                    <input 
                        type="checkbox"
                        //defaultChecked={task.status}
                        onChange={() => {markAsComplete(task.id)}}
                        checked={parseInt(status)}
                    />
                    
                </React.Fragment>
                :
                <div></div> 
            }
                
                <span className="checkmark"></span>   
            </label>
        </div>
        
        
    )
}