import Joyride from 'react-joyride';
import React from 'react';

export const WelcomeTour = ({ run, tourKey }) => {
  const endMsg = "Thanks for taking the tour. You can re-take it any time by clicking right here. Let’s go to your dashboard!";
  const welcomeTourSteps = [
    {
      target: ".welcomeTourIntro",
      content: "Welcome to Moving2Canada GO! We’re excited to help you organize your big move to Canada. Take this quick tour to get the most out of your account.",
      placement: "center",
    },  
    {
      target: '.editDetails_update',
      content: "You can edit your profile right here. The more accurate information you provide, the more we can do to help you settle in Canada.",
    },  
    { 
      target: '.progressModule',
      content: 'Your Progress Checklist is at the heart of everything in Moving2Canada GO! Here you’ll find the number of tasks you’ve completed so far, as well as the number of tasks remaining. You’ll also find related resources for each task in your Progress Checklist, so you can complete the task with confidence. Nearly all of these resources are provided either by our expert team or by the Government of Canada. You can also add your own tasks to keep track of things you want to complete or achieve.',
      placement: 'bottom-end'
    },
    { 
      target: '.mostImportantModule',
      content: 'Your most important upcoming tasks are listed over here. Some of these are mandatory — you won’t be able to enjoy living and working in Canada without completing them! When you complete a task, check it off by clicking the box icon. New important tasks will appear as you move through your journey.',
      placement: 'bottom' 
    },    
    /* { 
      target: '.forumModule',
      content: 'If you want to ask a question or give advice, you can interact with other people moving to Canada through the same immigration program on our Moving2Canada Community Forum. For example, the Forum is a great place to discuss your destination city or finding work in a particular field.',
      placement: 'bottom'    
    }, */
    { 
      target: '.articleModule',
      content: 'These articles have been chosen by us for you, based on your personal background and goals. You’ll always find relevant material right here.'
    },
    { 
      target: '.notesModule',
      content: 'Adding notes is a great way to keep track of progress when moving along with a task, allowing you to keep solid records and not rely on memory.'
    },
    { 
      target: '.startTour',
      content: endMsg
    },   
];
/* const styles = {
  arrowColor: '#fff',
  backgroundColor: '#fff',
  beaconSize: 36,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  primaryColor: '#000',
  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  textColor: '#333',
  width: undefined,
  zIndex: 100,
}; */

  return (
    <div className="welcomeTour">
      <div className="welcomeTourIntro"></div>
      <Joyride
        steps={welcomeTourSteps}
        continuous
        /* debug */
        run={run}
        autostart={run}
        disableOverlayClose
        disableCloseOnEsc
        showProgress
        locale={ {back: 'Back', close: 'Close', last: 'End', next: 'Next', skip: 'Skip'} }
        styles={{
          options: {
            primaryColor: '#ec1f1f',
          },
        }}
        key={ tourKey }
      />
    </div>
  );
}