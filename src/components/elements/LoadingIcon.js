import React from 'react';

export const LoadingIcon = ({ isLoading }) => {
    return(
       // <div className="lds-roller checkbox-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
       <div className="loaderContainer">
           <div className="spinner">
                <span className="spinner-inner-1"></span>
                <span className="spinner-inner-2"></span>
                <span className="spinner-inner-3"></span>
            </div>
       </div>
        
    )
}