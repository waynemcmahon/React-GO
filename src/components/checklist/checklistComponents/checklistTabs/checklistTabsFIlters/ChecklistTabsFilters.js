import React from 'react';
import { Columns, Button } from "react-bulma-components/full";
import { FaPlus } from 'react-icons/fa';
import SortByButton from "../SortByButton";
import FilterByButton from "../FilterByButton";

export const ChecklistTabsFilters = ({sortBy, filterBy, toggleAddTask}) => {
    return(
        <Columns.Column size={5} className="checklistBtns is-12-mobile is-12-tablet is-5-desktop is-paddingless">
            <Columns.Column>
                <FilterByButton 
                    filterBy={filterBy}
                />
                </Columns.Column>
            <Columns.Column>
                <SortByButton 
                    sortBy={sortBy}
                />
            </Columns.Column> 
            <div className="field checklistBtns__AddTask">
                <Button 
                    className="checklistBtns__Add_Task"
                    onClick={() => {toggleAddTask()}}
                    >
                    <FaPlus size={25}/>
                </Button>
            </div>
        </Columns.Column>
    )
}