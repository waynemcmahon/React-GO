import axios from 'axios';
import { addTask, addInitialTasks } from '../components/data/GetData';

export function countTotalTasks (tasks){//count total user tasks
    let count = 0;
    if (tasks !== undefined) {
        tasks.map(task => {
            count++;
            return task;
        })
    }
    return (
        count
    ) 
}

export function countTasks (tasks){
    let count = 0;
    if (tasks !== undefined) {
        tasks.map(task => {
            //if (task.status === 0) {
                count++;
            //}
            return task;
        })
    }
    return (
        count
    ) 
}

export function countImportantTasks(tasks){//count user important tasks
    let count = 0;
    
    //if (tasks !== undefined) {
        tasks.forEach(task => {
            if (task.status === 0  && task.dependencyActive === 0 &&  task.important === 1) {
                count++;
                
            }
            //return task;
        })
    //}
    return (
        count
    ) 
}

export function countCompleteTasks(tasks){//count completed tasks
    let count = 0;
    if (tasks !== undefined) {
        tasks.map(task => {
            if (task.status === 1) {
                count++;
            }
            return task;
        })
    }
    return (
        count
    ) 
}

export function setTaskImportance(task, tasks){//set user task importance
    tasks.map(dTask => {
        if (task.taskId === dTask.id) {
            if (dTask.acf.only_important_if) {  
                                                                
                tasks.forEach(task1 =>{
                    
                    if(task1.taskId === dTask.acf.tasks_important_if['ID'] ){
                        //task.importantIfId = dTask.acf.tasks_important_if['ID'];
                        if (task1.status === 1) {
                            task.important = 1;
                        }
                    }
                })
            }  
            else{
                task.important = dTask.acf.important ? 1 : 0;
            }
        }

        return dTask;
    })
}

export function setTaskDependency(task, tasks){//set tasks to active/disabled based on the current completed/incompleted task dependencies 
    let dependencyList = [];
    let userTaskIds = [];
    let logic = "any"; 

    task.dependencyActive = 0;

    //tasks.map(dTask=> {
        let dependent = task.dependent;  
        
        if(dependent !== ""){
            if (task.acf !== undefined) {
                logic = task.acf.dependent_andor;
            }     
            else{
                logic = task.dependencyLogic;
            }                         

            dependencyList = task.dependent.split(',').map(function(item) {// create array of this task's dependent tasks IDs
                return parseInt(item, 10);
            });

            tasks.forEach(task1 => { // create an array all user's tasks IDs
                userTaskIds.push(task1.taskId);
            })

            if (logic === "any") {
                if (userTaskIds.some(r=> dependencyList.indexOf(r) >= 0)) {// if ANY of this task's dependant tasks exists in user tasks
                    if(task.status === 0){
                        task.dependencyActive = 1;
                    }                    
                    tasks.map(task1 => { // loop through user tasks and set depenedcy active
                        dependencyList.forEach( dep => {    
                            if(dep === task1.taskId && task1.status === 1 ){
                                task.dependencyActive = 0;                       
                            }
                        })
                        return task1;
                    })
                }
            }
            else if (logic === "all") {
                if ((userTaskIds, dependencyList) => dependencyList.every(v => userTaskIds.includes(v))) {// if ALL of this task's dependant tasks exists in user tasks
                
                    tasks.map(task1 => { // loop through user tasks and set dependency active
                        dependencyList.forEach( dep => {    
                            if(dep === task1.taskId && task1.status === 0 && task.status === 0){ // if there is still a dependant task not complete, set to disabled
                                task.dependencyActive = 1;                       
                            }
                        })
                        return task1;
                    }) 
                }
            }
        }

        return task;

    //})
}

export function setUserInfo(userInfo){
    let user = [];
    if(userInfo.firstName === "" || userInfo.firstName === null){
        user.name = "Stranger"
    }
    else{
        user.name = userInfo.firstName;
    }
    if (userInfo.movingTo === "" || userInfo.movingTo === null) {
        user.movingTo = ""
    }
    else{
        user.movingTo = userInfo.movingTo;
    }
    if (userInfo.movingDate === "" || userInfo.movingDate === null) {
        user.movingDate = ""
    }
    else{
        user.movingDate = userInfo.movingDate;
    }

    user.userId = userInfo.userId;

    return user;
}

export function setLastTaskComplete(lastTaskComplete){
    let mostRecentTaskComplete = "";
    if (lastTaskComplete.length !== 0) {
            mostRecentTaskComplete = lastTaskComplete[0].name
    } 
    return mostRecentTaskComplete
}

export function setCategoriesStages(){
    /* if(stages.indexOf(defaultTask.stage) === -1) {
        stages.push(defaultTask.stage);
    }

    if (task.acf.categories) {
        task.acf.categories.forEach(element => {
            if(categories.indexOf(element) === -1) {
                categories.push(element);
            }
        })
    }   */
}

export function setUserArticles(articles, userInfo){//set tasks relevant to users
    const destination = userInfo.movingTo;
    const currently = userInfo.response;
    const nationality = userInfo.nationality;
    
    let userArticles = articles.filter(article => {
        if(!article.filter_by_nationality && !article.filter_by_currently && !article.filter_by_destination){
                return article;
        }   
        else if(article.filter_by_nationality && article.nationality === nationality && !article.filter_by_currently && !article.filter_by_destination){
                return article;
        }   
        else if(!article.filter_by_nationality && article.filter_by_currently && article.currently.indexOf(currently) !== -1 && !article.filter_by_destination){
            return article;
        }     
        else if(!article.filter_by_nationality && !article.filter_by_currently && article.filter_by_destination && article.destination.indexOf(destination) !== -1){
            return article;
        }     
        else if(article.filter_by_nationality && article.nationality === nationality && article.filter_by_currently && article.currently.indexOf(currently) !== -1 && !article.filter_by_destination){
            return article;
        }     
        else if(article.filter_by_nationality && article.nationality === nationality && !article.filter_by_currently && article.filter_by_destination && article.destination.indexOf(destination) !== -1){
            return article;
        }   
        else if(!article.filter_by_nationality && article.filter_by_currently && article.currently.indexOf(currently) !== -1 && article.filter_by_destination && article.destination.indexOf(destination) !== -1){
            return article;
        }   
        else if(article.filter_by_nationality && article.nationality === nationality && article.filter_by_currently && article.currently.indexOf(currently) !== -1 && article.filter_by_destination && article.destination.indexOf(destination) !== -1){
            return article;
        }   
        return;
    })
    return userArticles;
}

export function getNewDefaultTask(tasks, defaultTasks){//get tasks that have been added since users been active and check if relevant
    const newDelFormatTaskId = 33384;
    let newDefaultTasks = [];
    let newTasksToAdd = [];

    defaultTasks.map(task => {
        if(task.id >= newDelFormatTaskId){
            newDefaultTasks.push(task);
        }
    })

    newDefaultTasks.map(task => {
        if (tasks.findIndex(obj => obj.taskId === task.id) === -1){
            newTasksToAdd.push(task);
        }
    })

    return newTasksToAdd;  
}

export function addNewDefaultTask(newTasksToAdd){//add new task that have been added since users been active and check if relevant 
    let updatedTasks;
    let update = true;
    axios.post(addInitialTasks, { newTasksToAdd, update })
        .then(res => {
            return res.data;              
        })
}
    
export function setTaskParams(defaultTasks, userInfo){//convert default task advanced custom field parameters to match apps
    let userTasks = [];
    let i = 0;
    const userRes = userInfo.response;
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
        defaultTask.userId = userInfo.userId;
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
    });
    return userTasks;
}

export function setUserTaskParams(userTasks, defaultTasks){//convert user task advanced custom field parameters to match apps
    userTasks.map(task => {
        task.relatedLink = [];
        task.relatedTitle = [];
        task.relatedAuthor = [];
        task.relatedImage = [];
        task.relatedImageAlt = [];

        task.dependencyActive = 0;

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

    userTasks.map(task => {
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
                    task.important = userImportance;
                }

                else if (task.importantIf) {
                    userTasks.forEach(task1 => {
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

        task = setTaskDependency(task, userTasks);

        return task;
    })
    return userTasks;
}