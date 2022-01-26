import React, {useEffect} from 'react';
import { Dashboard } from '../dashboard/Dashboard';
import { Nav } from '../elements/Nav';
import { Checklist } from '../checklist/Checklist';
import { ArticlesView } from '../dashboard/articles/ArticlesView';
import { NotesView } from '../dashboard/notes/NotesView';
import { Columns } from "react-bulma-components/full";
import { NavLink } from "react-router-dom";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import ScrollToTop from '../../helpers/ScrollToTop';
import { PageView }  from '../tracking';

export const Content = ({
  changeHeaderText,
  changeBreadcrumb,
  breadcrumbLinks,
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
  taskDetailsVisible, 
  taskDetailsTask, 
  taskResources,
  tabIndex, 
  activeTab, 
  toggleAddTask, 
  addTaskVisible,
  sortBy,
  filterBy,
  sort,
  filter,
  tabStages,
  tabCategories,
  changeNoteState,
  tasksTotalCount,
  tasksCompleteCount,
  forumDiscussions,
  firstName,
  userArticles,
  showNotification,
  showNotesNotification,
  checkboxLoading,
  userId,
  localhost
} ) => {
  const navStyle={
    "display" :"none"
  }

  useEffect(() => {

    if(tasks.length > 0){
      PageView()
    }
    
  }, [breadcrumbLinks]);

  return (
  <Columns.Column size={8}>
    <BrowserRouter basename={'go'}>  
    <ScrollToTop />
      <div className="breadcrumb">
          <ul>
        <Nav links={breadcrumbLinks}/>
        </ul>
      </div>
      <div className="breadcrumb" style={navStyle}>
        <ul>
          <li className="titleRed dashboardLink"><NavLink exact={true} id="dashboardLinkBtn" to="/dashboard">Dashboard</NavLink></li>
          <li className="titleRed checklistLink"><NavLink to="/checklist" id="checklistLinkBtn">Checklist</NavLink></li>          
          <li className="titleRed articlesLink"><NavLink to="/articles" id="articlesLinkBtn">Articles</NavLink></li>          
          <li className="titleRed notesLink"><NavLink to="/notes" id="notesLinkBtn">Notes</NavLink></li>     
        </ul>
      </div>
      {/* <Route path="/m2c-tool/" render={() => (
          <Redirect exact to="/dashboard"/>
      )}/> */}
      <Route exact path="/" render={() => (
          <Redirect exact to="/dashboard"/>
      )}/>
      {/* <Route exact path="/m2c-app/" render={() => (
          <Redirect exact to="/"/>
      )}/> */}
      <Route 
        exact 
        path='/dashboard' 
        render={(props) => <Dashboard
        tasksTotalCount={tasksTotalCount}
        tasksCompleteCount={tasksCompleteCount}
        changeHeaderText={changeHeaderText}
        changeBreadcrumb={changeBreadcrumb}
        tasks={tasks}
        tasks={tasksInit}
        deleteTask={deleteTask}
        addDate={addDate}
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
        changeNoteState={changeNoteState} {...props} 
        forumDiscussions={forumDiscussions}
        firstName={firstName}
        userArticles={userArticles}
        localhost={localhost}
      /> 
        }
      />
      <Route 
        exact
        path='/checklist'  
        render={(props) => <Checklist 
        tasks={tasks}
        tasksInit={tasksInit}
        changeHeaderText={changeHeaderText}
        changeBreadcrumb={changeBreadcrumb}
        defaultTasks={defaultTasks}
        deleteTask={deleteTask}
        addDate={addDate}
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
        showNotification={showNotification}
        showNotesNotification={showNotesNotification}
        checkboxLoading={checkboxLoading}
        changeNoteState={changeNoteState} {...props} />           
      }
      />        
      <Route 
        exact
        path='/notes'  
        render={(props) => <NotesView 
          tasks={tasks}
          tasksInit={tasksInit}
          changeHeaderText={changeHeaderText}
          changeBreadcrumb={changeBreadcrumb}
          deleteTask={deleteTask}
          addDate={addDate}
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
      />    
      <Route
        path='/articles'
        render={
          props =>
          <ArticlesView 
            changeHeaderText={changeHeaderText}
            changeBreadcrumb={changeBreadcrumb}
            userArticles={userArticles}
          />
        }    
      />
      {/* <Checklist 
        tasks={tasks}
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
      />    */}
      </BrowserRouter>
  </Columns.Column>
  )
}




