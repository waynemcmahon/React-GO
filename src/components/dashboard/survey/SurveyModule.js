import React from 'react';
import { Box, Button } from 'react-bulma-components/full';
import { ReactComponent as Logo } from '../../../scss/images/logo.svg';

export const SurveyModule = ({tasks, tasksCompleteCount, tasksTotalCount}) => {

    const handleBtnClick = event => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSeVoHRYf6PMjZBiLBcGJryF4Nu1rbRRvKLBnHChwIvIb5lC-w/viewform", "_blank") //to open new page
    }

    return (
    <Box className="surveyModule">
        <Logo className="m2c-logo"/>
        <h2 className="subtitle">How Are We Doing?</h2>
        <p>Your feedback can help us to help you! </p>
        <br></br>
        <p>Take our short survey.</p>
        <br></br>
        <Button 
            className="purple arrow"
            onClick={() => { handleBtnClick() }}
        >
            Take Survey
        </Button>
    </Box>
    )
    
}