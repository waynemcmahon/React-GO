import ReactGA from "react-ga";

export const initGA = (trackingID, userId) => {           
  //ReactGA.initialize(trackingID);
  if(userId !== undefined){
    ReactGA.initialize(trackingID, {
      gaOptions: {
        userId: userId
      }
    });
  }
 }

 export const PageView = () => {  
    ReactGA.pageview(window.location.pathname +  
                     window.location.search);
                     console.log("Page View Sent");
}

/**
 * Event - Add custom tracking event.
 * @param {string} category 
 * @param {string} action 
 * @param {string} label 
 */
export const Event = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label
    });
  };