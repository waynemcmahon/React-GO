import React from 'react';
import { Columns } from "react-bulma-components/full";

export const Header = ({ headerText, firstName }) => {
    return(
        <div className="header" data-testid="header">
                    <Columns>
                        <Columns.Column>
                            <h1 className="title">{headerText}</h1>
                        </Columns.Column>                        
                    </Columns>   
        </div>
    )
}