import React from 'react';
import { Tabs, Columns } from "react-bulma-components/full";

export const ChecklistTabsCategory = ({activeTab, filterByStage, filterByCategory, tabCategories}) => {
  tabCategories = ["All"].concat(tabCategories);
  const tabList = tabCategories;
      
  return (
    <Columns.Column size={7} className="level tab-stage is-12-mobile is-12-tablet is-7-desktop">            
    <Tabs className="is-marginless">
    { tabList.map(tab => 
        <Tabs.Tab
            onClick={() => {filterByCategory(tab)}}
            key={tab}
            className={tab === activeTab ? 'is-active' : ''}
        >
            {tab}
        </Tabs.Tab>
    )}          
    </Tabs>  
    </Columns.Column>
  )
}