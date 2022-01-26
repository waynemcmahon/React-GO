import React, { Component } from 'react';
import axios from 'axios';
import { Header } from './components/layouts/Header';
import { Content } from './components/layouts/Content';
import { Sidebar } from './components/layouts/Sidebar';
//import { Dashboard } from './components/Dashboard';
//import { Nav } from './components/Nav';
import { BrowserRouter } from 'react-router-dom';
//import ScrollToTop from './helpers/ScrollToTop';
import { Columns, Section, Container, Loader, Notification, Button } from "react-bulma-components/full";
import { getTasks, getDefaultTasks, addTask, addInitialTasks, addNewTasks, deleteTask, completeTask, importantTask, userInfo, getLastTaskComplete, getForumDiscussions, getArticlesForYou, updateUserInCanada, undoUserInCanada, updateUserAlreadyApproved, undoUserAlreadyApproved } from './components/data/GetData';
import { setUserInfo, setTaskDependency, /* setLastTaskComplete, */ countTasks, countImportantTasks, countCompleteTasks, setUserArticles, getNewDefaultTask, addNewDefaultTask, setTaskParams , setUserTaskParams} from './helpers/taskFunctions';
import { WelcomeTour } from './components/welcomeTour/WelcomeTour';
import { initGA, PageView, Event }  from './components/tracking';


//import './sass/_variable.sass';

class App extends Component {
    constructor(props) {
        super(props)

        props = {
            tasks: [],
            initTasks: [],
            defaultTasks: [],
            posts: [],
            response: [],
            activeTab: "All",
            headerText: "Your move to Canada!",
            breadcrumbLinks: ["Dashboard"],
            taskDetailsVisible: false,
            addTaskVisible: false,
            taskDetailsTask: "",
            taskResources: [],
            sort: "",
            filter: "",
            tabStages: [],
            tabCategories: ["Immigration", "Employment", "Planning", "Living"],
            firstName: "",
            movingTo: "",
            movingDate: "",
            numOfTotalTasks: 0,
            numOfImportantTasks: 0,
            numOfCompletedTasks: 0,
            mostRecentTaskComplete: "",
            loading: true,
            hideApp: "sectionHide",
            forumDiscussions: [],
            userArticles: [],
            notificationText:"",
            notificationHidden:"hide",
            welcomeTourRun: false,
            welcomeTourKey: 0,
            checkboxLoading: 0,
            localhost: false
        };

        this.state = props;
        this.state.tasksInit = props.tasks;

        this.toggleTaskDetails = this.toggleTaskDetails.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.filterBy = this.filterBy.bind(this);
        this.changeHeaderText = this.changeHeaderText.bind(this);
        this.changeBreadcrumb = this.changeBreadcrumb.bind(this);
        this.setWelcomeTourRun = this.setWelcomeTourRun.bind(this);
    }

    componentDidMount() {
        let userTasks = [];
        let stages = ["All"];
        let categories = this.state.tabCategories;
        var i = 0;

        if(window.location.hostname === "localhost"){
            this.setState({
                localhost: true
            })
        }
        
        axios.all([
            axios.get(getTasks),
            axios.get(getDefaultTasks),
            axios.get(getLastTaskComplete),
            axios.get(userInfo),
            axios.get(getArticlesForYou)
        ])
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
        .then(res => {
            console.log(res);
            const fetchedTasks = res[0].data;
            const defaultTasks = res[1].data;
            //const lastTaskComplete = res[2].data;
            const userInfo = res[3].data;
            const forumDiscussions = "";
            const articlesForYou = res[4].data.acf.choose_articles;
            const newDelFormatTaskId = 35082;
            //window.location.hostname !== "https://moving2canada.com" ?
            //initGA('UA-35322811-1', userInfo.userId);
            //PageView();
            //if (fetchedTasks.length === 0) {
            if (fetchedTasks.length !== 0) {

                let newTasks = getNewDefaultTask(fetchedTasks, defaultTasks);
                let newUserTasks = setTaskParams(newTasks, userInfo);
                let userTasks = fetchedTasks;
                if (newUserTasks !== undefined && newUserTasks.length !== 0) {
                    axios.post(addNewTasks, newUserTasks)
                        .then(res => {
                            userTasks = res.data;    
                            
                            let userTasks1 = setUserTaskParams(userTasks, defaultTasks);
                            
                            this.setState({
                                tasks: userTasks1,
                                tasksInit: userTasks1,
                            })                         
                        })
                }

                /* userTasks.map(task => {
                    task.relatedLink = [];
                    task.relatedTitle = [];
                    task.relatedAuthor = [];
                    task.relatedImage = [];
                    task.relatedImageAlt = [];

                    task.dependencyActive = 0;

                    let newDefaultTasks = [];

                    defaultTasks.filter(defaultTask => {  
                        if (task.taskId === defaultTask.id) {    
                            if (task.name !== defaultTask.title.rendered) {
                                task.name = defaultTask.title.rendered;
                            }
                            if (task.category !== defaultTask.acf.categories.toString()) {
                                task.category = defaultTask.acf.categories.toString();
                            }

                            if (task.message !== defaultTask.content.rendered) {
                                task.message = defaultTask.content.rendered;
                            }

                            if (task.mandatory !== defaultTask.acf.mandatory ? (1) : (0)) {
                                task.mandatory = defaultTask.acf.mandatory ? (1) : (0);
                            }

                            if (defaultTask.acf.dependent_on !== undefined) {
                                task.dependent = defaultTask.acf.dependent_on.toString();
                            }

                            task.priority = +defaultTask.acf.priority;

                            if (defaultTask.acf.related_resources) {
                                defaultTask.acf.related_resources.forEach(resource => {
                                    task.relatedLink.push(resource.link);
                                    task.relatedTitle.push(resource.title);
                                    task.relatedAuthor.push(resource.author);
                                    task.relatedImage.push(resource.image.url);
                                    task.relatedImageAlt.push(resource.image.alt);
                                })
                            }

                            if((!task.date  || task.date === "0000-00-00")){
                                task.date = "";
                            }

                            if(defaultTask.acf.date_type === "days_from_task"){
                                task.dateDependentTasks = defaultTask.acf.add_a_task_date
                            }
                        }         
                        return defaultTask;
                    })
                    return task;
                });

                console.log(this.state.tasks);

                let tasks = this.state.tasks.concat(userTasks);

                tasks.map(task => {
                    task.dependent = "";
                    task.dependencyLogic = "any";
                    const userImportance = task.important;
                    task.important = 0;
                    task.importantIf = false;
                    task.importantIfId = "";

                    defaultTasks.map(dTask => {

                        if (task.taskId === dTask.id) {
                            if (dTask.acf.important && dTask.acf.only_important_if && dTask.acf.tasks_important_if['ID'] !== null) {
                                task.importantIf = dTask.acf.only_important_if;
                                task.importantIfId = dTask.acf.tasks_important_if['ID'];
                            }

                            if (dTask.acf.dependent_on) {
                                task.dependent = dTask.acf.dependent_on.toString();
                                if (dTask.acf.dependent_andor !== undefined) {
                                    task.dependencyLogic = dTask.acf.dependent_andor;
                                }
                            }
                            
                            if(userImportance !== 2 && userImportance !== null){
                                task.important = userImportance
                            }
                            else if (task.importantIf) {
                                tasks.forEach(task1 => {
                                    if (task1.taskId === task.importantIfId) {
                                        if (task1.status === 1) {
                                            task.important = 1;
                                        }
                                    }
                                })
                            }
                            else {
                                task.important = dTask.acf.important ? 1 : 0;
                            }                            
                        }
                        else if(task.category.indexOf("User") !== -1){
                            task.important = userImportance;
                            task.priority = 10000;
                        }
                        return dTask;
                    })

                    task = setTaskDependency(task, tasks);

                    return task;
                }) */

                let tasks = setUserTaskParams(userTasks, defaultTasks);

                //let mostRecentTaskComplete = setLastTaskComplete(lastTaskComplete);
                this.setState({
                    tasks: tasks,
                    tasksInit: tasks,
                    defaultTasks,
                    //mostRecentTaskComplete,
                    loading: false,
                    hideApp: "",
                    forumDiscussions
                })
            }
            else {
                const userRes = userInfo.response;
                let userResponses = [];

                if (userRes === null && !this.state.localhost) {
                    alert("You need to complete the eligibility questionnaire before accessing this tool");
                    return;
                }

                defaultTasks.filter(task => {
                    let defaultTask = {};
                    let dateType = 0;
                    defaultTask.relatedLink = [];
                    defaultTask.relatedTitle = [];
                    defaultTask.relatedAuthor = [];
                    defaultTask.relatedImage = [];
                    defaultTask.relatedImageAlt = [];

                    if (task.acf.only_include_if) {
                        let res = task.acf.include_user_response.toString();
                        let resArray = res.split(',');
                        if(resArray.indexOf(userRes) === -1){
                            return;
                        }
                    }

                    if(task.acf.serve_task_by_country === true && task.acf.which_countries !== userInfo.nationality){
                        return;
                    }

                    defaultTask.id = i;
                    defaultTask.taskId = task.id;
                    defaultTask.status = 0;
                    defaultTask.name = task.title.rendered;
                    defaultTask.message = task.content.rendered;
                    defaultTask.stage = task.acf.stage;
                    defaultTask.category = task.acf.categories;
                    defaultTask.important = task.acf.important === true && task.acf.only_important_if !== true ? 1 : 0;
                    defaultTask.mandatory = task.acf.mandatory === true ? 1 : 0;

                    if(task.acf.date_type === "deadline"){
                        dateType = 1
                    }
                    else if(task.acf.date_type === "days_from_task"){
                        dateType = 2
                    }

                    if(task.acf.date && task.acf.select_task_date){
                        defaultTask.date = task.acf.date;
                        defaultTask.dateType = dateType;
                    }

                    if (task.acf.related_resources) {
                        task.acf.related_resources.forEach(resource => {
                            defaultTask.relatedLink.push(resource.link);
                            defaultTask.relatedTitle.push(resource.title);
                            defaultTask.relatedAuthor.push(resource.author);
                            defaultTask.relatedImage.push(resource.image.url);
                            defaultTask.relatedImageAlt.push(resource.image.alt);
                        })
                    }

                    if (task.acf.dependent_on) {
                        defaultTask.dependent = task.acf.dependent_on.toString();
                    }

                    if(task.acf.select_task_date === undefined || !task.acf.date || task.acf.date === "0000-00-00" ){
                        defaultTask.date = "";                        
                    }
                    else{
                        defaultTask.date = task.acf.date;
                        defaultTask.dateType = dateType;
                    }

                    userTasks.push(defaultTask);
                    i++;


                    return userTasks;

                });

                this.setState({
                    response: userResponses,
                    tasks: userTasks,
                    initTasks: userTasks
                });

                axios.post(addInitialTasks, this.state.initTasks)
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                    })
                    .then(res => {
                        let tasks2 = res.data;
                        tasks2.map(task => {
                            task.dependencyActive = 0;
                            task.relatedLink = [];
                            task.relatedTitle = [];
                            task.relatedAuthor = [];
                            task.relatedImage = [];
                            task.relatedImageAlt = [];

                            defaultTasks.map(dTask => {
                                if (dTask.id === task.taskId) {
                                    if (dTask.acf.related_resources) {
                                        dTask.acf.related_resources.forEach(resource => {
                                            task.relatedLink.push(resource.link);
                                            task.relatedTitle.push(resource.title);
                                            task.relatedAuthor.push(resource.author);
                                            task.relatedImage.push(resource.image.url);
                                            task.relatedImageAlt.push(resource.image.alt);
                                        })
                                    }

                                    /* if (dTask.acf.only_important_if) {                                
                                        defaultTasks.forEach(task1 =>{
                                            if(task1.id === dTask.acf.tasks_important_if['ID']){
                                                task.importantIfId = dTask.acf.tasks_important_if['ID'];
                                            }
                                        })
                                    } */
                                }

                                return dTask;
                            })


                            return task;
                        })

                        tasks2.map(task => {
                            task.dependent = "";
                            task.dependencyLogic = "any";
                            task.important = 0;
                            task.importantIf = false;
                            task.importantIfId = "";

                            defaultTasks.map(dTask => {

                                if (task.taskId === dTask.id) {
                                    task.priority = +dTask.acf.priority;
                                    if (dTask.acf.important && dTask.acf.only_important_if && dTask.acf.tasks_important_if['ID'] !== null) {
                                        task.importantIf = dTask.acf.only_important_if;
                                        task.importantIfId = dTask.acf.tasks_important_if['ID'];
                                    }

                                    if (dTask.acf.dependent_on) {
                                        task.dependent = dTask.acf.dependent_on.toString();
                                        if (dTask.acf.dependent_andor !== undefined) {
                                            task.dependencyLogic = dTask.acf.dependent_andor;
                                        }
                                    }

                                    if (task.importantIf) {
                                        tasks2.forEach(task1 => {
                                            if (task1.taskId === task.importantIfId) {
                                                if (task1.status === 1) {
                                                    task.important = 1;
                                                }
                                            }
                                        })
                                    }
                                    else {
                                        task.important = dTask.acf.important ? 1 : 0;
                                    }
                                }
                                return dTask;
                            })

                            task = setTaskDependency(task, tasks2);

                            return task;
                        })

                        //let mostRecentTaskComplete = setLastTaskComplete(lastTaskComplete);

                        this.setState({
                            tasks: tasks2,
                            tasksInit: tasks2,
                            defaultTasks,
                            //mostRecentTaskComplete,
                            loading: false,
                            hideApp: "",
                            forumDiscussions
                        });

                        setTimeout(() => {
                            this.setState({
                                welcomeTourRun: true
                            });
                        }, 1000)
                    })
            }

            let user = setUserInfo(userInfo);
            let totalTasks = countTasks(this.state.tasks);
            let completeTasks = countCompleteTasks(this.state.tasks);
            let importantTasks = countImportantTasks(this.state.tasks);

            let userArticlesSet = setUserArticles(articlesForYou, userInfo);
            this.setState({
                numOfTotalTasks: totalTasks,
                numOfImportantTasks: completeTasks,
                numOfCompletedTasks: importantTasks,
                firstName: user.name,
                userId: user.userId,
                movingTo: user.movingTo,
                movingDate: user.movingDate,
                userArticles: userArticlesSet
            })
        })
    }

    deleteTask = (id) => {
        let name, category;
        let numOfImportantTasks = this.state.numOfImportantTasks;
        let tasks = this.state.tasks.filter(task => {
            if(task.id === id){
                name = task.name;
                category = task.category;
            }            
            return task.id !== id
        })
        console.log(tasks);
        let tasksInit = this.state.tasksInit.filter(task => {            
            return task.id !== id
        })

        this.setState({
            tasks, //shortcut for tasks: tasks
            tasksInit,
            taskDetailsVisible: 0,
            numOfImportantTasks
        })

        let task = {}
        task.id = id;
        axios.post(deleteTask, { task })
            .then(res => {
                console.log(res);   
                this.showNotification("Task has been deleted");   
                var search = "User";  
                if (category.indexOf(search) > -1)
                { 
                    name = "User Task";
                }
                Event("Task", "Deleted", name);
            })
    }

    addDate = (data) => {
        console.log("worked");
    }

    addTask = (data) => {
        let task = {};      
        task.name = data.task.taskName;
        task.message = "";
        task.resources = "";
        task.stage = data.task.stage;
        task.important = data.task.important === "Yes" ? 1 : 0;
        task.category = data.task.category;
        task.mandatory = 0;
        task.include = "";
        task.exclude = "";
        task.notes = "";
        task.status = 0;
        task.dependent = "";
        task.date = data.task.date;
        if(data.task.dateType === "Event"){
            task.dateType = 0
        }
        else if(data.task.dateType === "Deadline"){
            task.dateType = 1
        }
        this.setState({
            addTaskVisible: false,
        })

        console.log(task);

        axios.post(addTask, { task })
            .then(res => {
                let tasks = [...this.state.tasks];
                let tasksInit = [...this.state.tasksInit];

                tasks.push(task);
                tasksInit.push(task);
                tasks[tasks.length - 1].id = res.data;
                tasks[tasks.length - 1].taskId = res.data;
                tasks[tasks.length - 1].dependencyActive = 0;
                tasks[tasks.length - 1].dependencyLogic = "any";
                tasks[tasks.length - 1].priority = 10000;

                this.showNotification("1 task added");                

                this.setState({
                    tasks, //shortcut for tasks: tasks
                    tasksInit,
                })

                console.log(res);

               Event("Task", "Added", "User Task");
            })
    }

    markAsImportant = (id) => {
        let task = {};
        let name;
      /*   this.setState({
            checkboxLoading: id
        }); */
        const tasks = this.state.tasks.slice();
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks[i].important = (tasks[i].important ? 0 : 1);
                task.important = tasks[i].important;
                task.id = id;
                task.name = tasks[i].name;
                task.category = tasks[i].category;
            }
        }

        axios.post(importantTask, { task })
        .then(res => {
            console.log(res);
            this.setState({
                tasks: tasks,
            });
            task.important ?
            this.showNotification("This has been added to your most important tasks") :
            this.showNotification("This has been removed from your most important tasks");

            var search = "User";  
                if (task.category.indexOf(search) > -1)
                { 
                    name = "User Task";
                }
                else{
                    name = task.name
                }

            /* task.important ?
            Event("Task", "Important", name) :
            Event("Task", "Unimportant", name); */
        })
    }

    markAsComplete = (id) => {
        let task = {};
        let name;
        let taskId;
        /* this.setState({
            checkboxLoading: id
        }); */
 
        const tasks = this.state.tasksInit.slice();
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {

                const completedTask = tasks[i];

                
                taskId = tasks[i].taskId

                tasks[i].status = (parseInt(tasks[i].status) ? 0 : 1);
                task.status = tasks[i].status;
                task.id = id;
                task.name = tasks[i].name;
                task.category = tasks[i].category;

                tasks.map(task1 => {
                    if (task1.importantIfId === completedTask.taskId) {
                        if (task.status === 1) {
                            task1.important = 1;
                        }
                        else {
                            task1.important = 0;
                        }
                    }

                    task1 = setTaskDependency(task1, this.state.tasksInit);

                    if(task1.dateDependentTasks === completedTask.taskId){//if the completed task is in the list of dependent tasks

                    }

                    if(task1.dateDependentTasks && tasks[i].status === 1){                       
                        task1.dateDependentTasks.map(dependentTask => {
                            console.log(task1.taskId);
                            console.log(dependentTask.select_task_date.ID);
                            console.log(completedTask.taskId);
                            if(completedTask.taskId === dependentTask.select_task_date.ID){
                                
                                console.log(dependentTask.select_task_date);
                                console.log(dependentTask.select_task_date_days);
                                let date = new Date();
                                let days = dependentTask.select_task_date_days

                                date.setDate(date.getDate() + days);
                                task1.date = date;
                                console.log(task1);
                            }
                        })
                    }
                    return task1;
                })
            }
        }      

        axios.post(completeTask, { task })
        .then(res => {
            console.log(res);
            this.setState({
                initTasks: tasks,
                taskDetailsVisible: 0,
                mostRecentTaskComplete: task.name,
                //checkboxLoading: false
            }); 
            
            var notificationCompleteText;
            var completeTasksNum = countCompleteTasks(tasks); 

            if(taskId === 32235){
                notificationCompleteText = "Congrats on receiving your ITA! This is a huge step.";            
            }
            else if(taskId === 32224){
                notificationCompleteText = "You’re approved! Well done. Now, let’s plan for arrival. Your next important tasks are in your checklist.";
                if( task.status === 1){
                    axios.get(updateUserAlreadyApproved)
                    .then(res => {
                        console.log(res);
                    })
                }     
                else if( task.status === 0){
                    axios.get(undoUserAlreadyApproved)
                    .then(res => {
                        console.log(res);
                    })
                }     
            }
            else if(taskId === 32186){
                notificationCompleteText = "Welcome to Canada :) You’re going to love it here.";
                if(task.status === 1){
                    axios.get(updateUserInCanada)
                    .then(res => {
                        console.log(res);
                    })
                }
                else if(task.status === 0){
                    axios.get(undoUserInCanada)
                    .then(res => {
                        console.log(res);
                    })
                }
            }
            else if(completeTasksNum === 10){
                notificationCompleteText = "You have now completed 10 tasks. Yay!";
            }
            else if(completeTasksNum === 20){
                notificationCompleteText = "Well done! With 20 tasks now completed, you’re well on the way to success in Canada.";
            }
            else if(completeTasksNum === 30){
                notificationCompleteText = "That’s 30 tasks now completed. Super work, keep it up!";
            }
            else if(completeTasksNum === 40){
                notificationCompleteText = "40 tasks done, that’s amazing!";
            }
            else if(completeTasksNum === 50){
                notificationCompleteText = "The big five-oh! You have now completed 50 tasks.";
            }            
            else{
                notificationCompleteText = "Task has been marked complete";
            } 
            //notificationCompleteText = "Task has been marked complete";
            task.status ?
                this.showNotification(notificationCompleteText) :
                this.showNotification("This task has been marked incomplete");
            
            var search = "User";  
            if (task.category.indexOf(search) > -1)
            { 
                name = "User Task";
            }
            else{
                name = task.name;
            }
            task.status ?
            Event("Task", "Complete", name) :
            Event("Task", "Incomplete", name);
        })
    }

    filterByStage = (stage, activeTab) => {
        let tasks = this.state.tasksInit.filter(task => {
            return task.stage === stage
        })
        if (stage === "All") {
            tasks = this.state.tasksInit;
        }
        this.setState({
            tasks: tasks
        })   
        this.changeActiveTab(stage);
    }

    filterByCategory = (category, activeTab) => {
        let tasks = this.state.tasksInit.filter(task => {
            if (task.category.indexOf(category) !== -1) {
                return task;
            }
            return;
        })

        if (category === "All") {
            tasks = this.state.tasksInit
        }
        this.setState({
            tasks: tasks
        })
        this.changeActiveTab(category);
    }

    changeActiveTab(tab) {
        this.setState({ activeTab: tab });
    }

    toggleTaskDetails(task) {
        this.setState({
            taskDetailsVisible: !this.state.taskDetailsVisible,
            taskDetailsTask: task
        });
        if(!this.state.taskDetailsVisible){
            PageView()
        }        
    }
    

    toggleAddTask() {
        this.setState({
            addTaskVisible: !this.state.addTaskVisible
        });
    }

    sortBy(data) {
        this.setState({
            sort: data.sortBy
        });
    }

    filterBy(data) {
        this.setState({
            filter: data.filterBy
        });
    }

    changeNoteState(data) {
    }

    changeHeaderText(data) {
        this.setState({
            headerText: data
        });
    }

    changeBreadcrumb(data) {
        this.setState({
            breadcrumbLinks: data
        });
    }

    handleCloseNotification = (e) => {
        this.setState({
            notificationHidden: "hide",
            notificationText: ""
        })
    }

    showNotesNotification = () => {
        this.showNotification("Your note has been saved");
    }

    showNotification = (text) => {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
          }

        this.setState({
            notificationHidden: "",
            notificationText: text.toString(),
        })

        this.timeout = setTimeout(function(){
            this.timeout = null
            this.setState({
                notificationHidden: "hide",
                notificationText: ""
            })
       }.bind(this),4500);
    }

    setWelcomeTourRun(data){
        document.getElementById('dashboardLinkBtn').click();
        this.setState({
            welcomeTourRun: data,
            welcomeTourKey: this.state.welcomeTourKey + 1
        })
        Event("Welcome Tour", "Click", "Started");
    }

    render() {
        return (
            <div>
            {/* <BrowserRouter basename={'go'}>   */}
                <Section className={"app " + this.state.hideApp}>
                    <Container>
                        <Header
                            headerText={this.state.headerText}
                            firstName={this.state.firstName}
                        />
                        <Columns>                        
                            <Sidebar
                                tasks={this.state.tasksInit}
                                movingDate={this.state.movingDate}
                                movingTo={this.state.movingTo}
                                tasksTotalCount={this.state.numOfTotalTasks}
                                tasksCompleteCount={this.state.numOfCompletedTasks}
                                tasksImportantCount={this.state.numOfImportantTasks}
                                mostRecentTaskComplete={this.state.mostRecentTaskComplete}
                                setWelcomeTourRun={this.setWelcomeTourRun}
                            />
                            <BrowserRouter basename={'go'} >
                            <Content
                                changeHeaderText={this.changeHeaderText}
                                changeBreadcrumb={this.changeBreadcrumb}
                                breadcrumbLinks={this.state.breadcrumbLinks}
                                tasks={this.state.tasks}
                                tasksInit={this.state.tasksInit}
                                defaultTasks={this.state.defaultTasks}
                                deleteTask={this.deleteTask}
                                addDate={this.addDate}
                                markAsImportant={this.markAsImportant}
                                markAsComplete={this.markAsComplete}
                                addTask={this.addTask}
                                filterByStage={this.filterByStage}
                                filterByCategory={this.filterByCategory}
                                activeTab={this.state.activeTab}
                                toggleTaskDetails={this.toggleTaskDetails}
                                taskDetailsTask={this.state.taskDetailsTask}
                                taskResources={this.state.taskResources}
                                taskDetailsVisible={this.state.taskDetailsVisible}
                                toggleAddTask={this.toggleAddTask}
                                addTaskVisible={this.state.addTaskVisible}
                                sortBy={this.sortBy}
                                filterBy={this.filterBy}
                                sort={this.state.sort}
                                filter={this.state.filter}
                                tabStages={this.state.tabStages}
                                tabCategories={this.state.tabCategories}
                                changeNoteState={this.changeNoteState}
                                forumDiscussions={this.state.forumDiscussions}
                                firstName={this.state.firstName}
                                userArticles={this.state.userArticles}
                                showNotification={this.showNotification}
                                showNotesNotification={this.showNotesNotification}
                                checkboxLoading={this.state.checkboxLoading}
                                userId={this.state.userId}
                                localhost={this.state.localhost}
                            />
                            </BrowserRouter>
                        </Columns>
                        <Notification className={this.state.notificationHidden + " appNotifications"}>
                            {this.state.notificationText}
                            <Button onClick={this.handleCloseNotification} remove/>
                        </Notification>
                    </Container>
                </Section>
               {/*  {
                    this.state.loading ? "" : <WelcomeTour run={this.state.welcomeTourRun}/>
                }
                 */}
                {
                    this.state.loading ?
                        <div className="loadingOverlay">
                            <Loader style={{ width: 100, height: 100, border: '2px solid #ec1f1f', borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
                        </div>
                        :
                        <div></div>
                }
                
            {/* </BrowserRouter> */}
            <WelcomeTour run={this.state.welcomeTourRun} tourKey={this.state.welcomeTourKey}/>
            </div>
            

        )
    }
}

export default App;
