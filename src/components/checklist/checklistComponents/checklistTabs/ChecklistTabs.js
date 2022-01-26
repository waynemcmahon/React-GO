import React from 'react';
import { Columns } from "react-bulma-components/full";
import { ChecklistTabsStage } from "./checklistTabsFIlters/filters/ChecklistTabsStage"; 
import { ChecklistTabsFilters } from "./checklistTabsFIlters/ChecklistTabsFilters"; 
import { ChecklistTabsCategory } from "./checklistTabsFIlters/filters/ChecklistTabsCategory"; 


export const ChecklistTabs = ({filterByStage, filterByCategory, activeTab, toggleAddTask, addTaskVisible, sortBy, filterBy, sort, filter, tabStages, tabCategories}) => {     
    var tabs = <ChecklistTabsStage activeTab={activeTab} filterByStage={filterByStage} tabStages={tabStages}/>;
    if (sort === "Category") {
        tabs = <ChecklistTabsCategory 
                    activeTab={activeTab}
                    filterByStage={filterByStage}
                    filterByCategory={filterByCategory}
                    tabCategories={tabCategories}
                />
    }
    return(        
        <div className="checklist-nav__Container" data-testid="checklist-content">
            <Columns className="level checklist-nav">
                {tabs}
                <ChecklistTabsFilters 
                    sortBy={sortBy}
                    filterBy={filterBy}
                    toggleAddTask={toggleAddTask}
                />                    
            </Columns>              
        </div>
    )
}
  
