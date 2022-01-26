import React from 'react';
import { Box, Button } from 'react-bulma-components/full';
//import { countTasks, countCompleteTasks } from '../../../helpers/taskFunctions';

export const ProgressModule = ({tasks, tasksCompleteCount, tasksTotalCount}) => {

    const handleBtnClick = event => {
        document.getElementById('checklistLinkBtn').click();
    }

   /*  let totalTasks = countTasks(tasks);
    let completeTasks = countCompleteTasks(tasks); */

    return (
    <Box className="progressModule">
        <h2 className="subtitle">Progress Checklist</h2>
        <div className="imgContainer">
            <img alt="progressChecklist" src="https://moving2canada.com/wp-content/themes/moving2canada/custom/images/go/checklist.png"/>
        </div>
        {/* <p><strong>( {completeTasks} ) </strong>task{completeTasks > 1 || completeTasks === 0 ? "s" : ""} completed</p>
        <div className="item progressContainer">
            <Progress max={totalTasks} value={completeTasks}/>
            <span className="progressCount__text">{completeTasks} out of {totalTasks} completed</span>
        </div> */}
        <Button 
            className="red arrow"
            onClick={() => { handleBtnClick() }}
        >
            Go To My Checklist
        </Button>
    </Box>
    )
    
}