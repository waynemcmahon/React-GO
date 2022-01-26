import React, { useEffect }  from 'react';
import { Columns } from 'react-bulma-components/full';
import { ProgressModule } from './progress/ProgressModule';
import { MostImportantModule } from './mostImportant/MostImportantModule';
import { ForumModule } from './forum/ForumModule';
import { NotesModule } from './notes/NotesModule';
import { ArticlesModule } from './articles/ArticlesModule';
import { SurveyModule } from './survey/SurveyModule';
import { UpcomingTasksModule } from './upcomingTasks/UpcomingTasksModule';
import { TaskDetails } from '../checklist/checklistComponents/taskDetails/TaskDetails';
import Masonry from 'react-masonry-css';

export const Dashboard = ( {
    tasksCompleteCount, 
    tasksTotalCount,
    tasks, 
    deleteTask, 
    markAsImportant, 
    markAsComplete, 
    toggleTaskDetails, 
    taskDetailsTask, 
    taskResources,
    taskDetailsVisible, 
    filter,
    changeNoteState,
    forumDiscussions,
    changeHeaderText,
    changeBreadcrumb,
    firstName,
    userArticles,
    localhost
} ) => {

    let title = {firstName}.firstName + "'s move to Canada!";
    let mobile = false;

     useEffect(() => {
        changeHeaderText(title);
    }, [changeHeaderText, title]); 

    let link = [
        {"title" : "Dashboard", "active" : false, "link" : ""}
    ];
     useEffect(() => {
        changeBreadcrumb(link);
    }, [changeBreadcrumb]);
    

    function debounce(fn, ms) {
        let timer
        return _ => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
      }

    const [isMobile, setIsMobile] = React.useState(false)
      React.useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            if (window.innerWidth <= 760) {
                setIsMobile(true)
            }
            else if(window.innerWidth > 760){
                setIsMobile(false)
            }
        }, 50)
        window.addEventListener('resize', debouncedHandleResize)
        return _ => {
          window.removeEventListener('resize', debouncedHandleResize)
      }
    })

    if (window.innerWidth <= 760 || isMobile) {
        mobile=true
    }
    else if(window.innerWidth > 760 || !isMobile){
        mobile=false
    }  
    
    return(
        <div className="dashboard">
            {
                !mobile ? 
                <Masonry
            breakpointCols={2}
            className="my-masonry-grid is-hidden-mobile"
            columnClassName="my-masonry-grid_column">
                <ProgressModule
                    tasksCompleteCount={tasksCompleteCount} 
                    tasksTotalCount={tasksTotalCount}
                    tasks={tasks}
                />
                <MostImportantModule
                    tasks={tasks}
                    deleteTask={deleteTask}
                    markAsImportant={markAsImportant}
                    markAsComplete={markAsComplete}
                    toggleTaskDetails={toggleTaskDetails}
                    filter={filter}
                />                
                {/* <ForumModule
                    tasksCompleteCount={tasksCompleteCount} 
                    tasksTotalCount={tasksTotalCount}
                    tasks={tasks}
                    forumDiscussions={forumDiscussions}
                />   */}
               {/*  <UpcomingTasksModule
                    tasks={tasks}
                    deleteTask={deleteTask}
                    markAsImportant={markAsImportant}
                    markAsComplete={markAsComplete}
                    toggleTaskDetails={toggleTaskDetails}
                    filter={filter}
                /> */}                      
                <SurveyModule />  
                <ArticlesModule
                    userArticles={userArticles}
                />   
                <React.Fragment></React.Fragment>
                <NotesModule
                    tasks={tasks}
                    deleteTask={deleteTask}
                    markAsImportant={markAsImportant}
                    markAsComplete={markAsComplete}
                    toggleTaskDetails={toggleTaskDetails}
                    filter={filter}
                />
            </Masonry>
             
             :

             <Columns className="is-hidden-tablet">
             <Columns.Column>
                 <ProgressModule
                     tasksCompleteCount={tasksCompleteCount} 
                     tasksTotalCount={tasksTotalCount}
                     tasks={tasks}                        
                 />
             </Columns.Column>
             <Columns.Column>
                 <MostImportantModule
                     tasks={tasks}
                     deleteTask={deleteTask}
                     markAsImportant={markAsImportant}
                     markAsComplete={markAsComplete}
                     toggleTaskDetails={toggleTaskDetails}
                     filter={filter}
                 />
             </Columns.Column>
             <Columns.Column>
                 <ArticlesModule
                     userArticles={userArticles}
                 />
             </Columns.Column>
             <Columns.Column>
                 <NotesModule
                     tasks={tasks}
                     deleteTask={deleteTask}
                     markAsImportant={markAsImportant}
                     markAsComplete={markAsComplete}
                     toggleTaskDetails={toggleTaskDetails}
                     filter={filter}
                 />
             </Columns.Column>
             {/* <Columns.Column>
                 <ForumModule
                     tasksCompleteCount={tasksCompleteCount} 
                     tasksTotalCount={tasksTotalCount}
                     tasks={tasks}
                     forumDiscussions={forumDiscussions}
                     localhost={localhost}
                 />
             </Columns.Column>   */}
             <Columns.Column>
                 <SurveyModule />
            </Columns.Column>
         </Columns>
            }

                   
           
            {
        taskDetailsVisible?

        <TaskDetails 
            tasks={tasks}
            markAsComplete={markAsComplete}
            markAsImportant={markAsImportant}
            taskDetailsTask={taskDetailsTask}
            taskResources={taskResources}
            taskDetailsVisible={taskDetailsVisible}
            toggleTaskDetails={toggleTaskDetails}
            deleteTask={deleteTask}
            changeNoteState={changeNoteState}
        />

        :

        <div></div> 
        }
        </div>
    )
        
}