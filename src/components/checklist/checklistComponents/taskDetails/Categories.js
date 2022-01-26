import React from 'react';
import { Tag } from "react-bulma-components/full";


export const Categories = ({ categories }) => {
    let categoriesArray = [];
    

      if (categories !== undefined) {
        categories = categories.toString();
        categoriesArray = categories.split(',');

    }

    return(
        <div>
            <Tag.Group className="task_categories_container">
                {categoriesArray.map((item, index) => (
                    <Tag key={index}>
                        {item}
                    </Tag>
                ))}
            </Tag.Group>
            {/* <div className="task_categories_container">
            {categoriesArray.map((item, index) => (
                <span className="task_categories_container__category" key={index}>{item}</span>
            ))}
        </div> */}
        </div>
        
        
        
   )
}