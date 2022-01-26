import React from 'react';
import { Tabs, Columns } from "react-bulma-components/full";

export const ChecklistTabsStage = ({activeTab, filterByStage, tabStages}) => {

  const tabList = [{label:"All", name: "All"}, 
                  {label:"Getting Ready", name:"Getting Ready"}, 
                  {label:"Landing Week", name: "Landing Week"},
                  {label:"In Canada", name:"In Canada"}];

  return (
    <Columns.Column size={7} className="level tab-stage is-12-mobile is-12-tablet is-7-desktop">            
    <Tabs className="is-marginless">
    { tabList.map(tab =>         
        <Tabs.Tab
            onClick={() => {filterByStage(tab.name)}}
            key={tab.name}
            className={tab.name === activeTab ? 'is-active' : ''}
        >
            {tab.label}
        </Tabs.Tab>
    )}          
    </Tabs>  
    </Columns.Column>
  )
}