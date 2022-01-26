import React, {useState} from 'react';
import {Columns, Progress, Modal, Content, Button} from "react-bulma-components/full";
import { 
    FaCanadianMapleLeaf
 } 
 from 'react-icons/fa';
 import { countTotalTasks, countCompleteTasks } from '../../helpers/taskFunctions';

export const Sidebar = ({movingTo, movingDate, mostRecentTaskComplete, tasks, setWelcomeTourRun}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(!modalOpen);
    }

    const locations = [
        {"label" : "I don't know", "value" : "Undecided"},
        {"label" : "Toronto, ON", "value" : "Toronto"},
        {"label" : "Vancouver, BC", "value" : "Vancouver"},
        {"label" : "Montreal, QC", "value" : "Montreal"},
        {"label" : "Calgary, AB", "value" : "Calgary"},
        {"label" : "Ottawa, ON", "value" : "Ottawa"},
        {"label" : "Edmonton, AB", "value" : "Edmonton"},
        {"label" : "Winnipeg, MB", "value" : "Winnipeg"},
        {"label" : "Hamilton, ON", "value" : "Hamilton"},
        {"label" : "Halifax, NS", "value" : "Halifax"},
        {"label" : "Victoria, BC", "value" : "Victoria"},
        {"label" : "Whistler, BC", "value" : "Whistler"},
        {"label" : "Banff, AB", "value" : "Banff"},
    ]
    let movingLocation = "";
    locations.forEach(location => {
        if(movingTo === location.value){
            movingLocation = location.label;
            return;
        }
        else{
            movingLocation = movingTo;
        }
    })
    
    let allTasks = countTotalTasks(tasks);
    let completeTasks = countCompleteTasks(tasks);

    const handleBtnClick = event => {
        window.open("https://moving2canada.com/go/report-a-bug/", "_blank") //to open new page
    }
    const handleTourBtnClick = event => {
        setWelcomeTourRun(true);
    }

    return(
    <Columns.Column size={4}>
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar__generic">
                <li className="item">
                    <div className="iconContainer">
                        <div className="icon"><span className="icon__plane"></span></div>
                    </div>                        
                    <div className="details">
                        <span className="details__text">
                            <span className="details__text__title">Moving to: </span> 
                            {movingLocation !== "" ? 
                            (<span> {movingLocation}</span>) : 
                            (<span className="movingTo_link movingTo_Update"><a href={"https://moving2canada.com/go/account/"}>Please update</a></span>)}
                        </span>
                    </div>
                    
                </li>
                <li className="item">
                    <div className="iconContainer">
                        <div className="icon"><span className="icon__box"></span></div>
                    </div>                        
                    <div className="details">
                        <span className="details__text">
                            <span className="details__text__title">Moving Date: </span> 
                            {movingDate !== "" ? 
                            (<span>{movingDate}</span>) : 
                            (<span className="movingTo_link"><a href={"https://moving2canada.com/go/account/"}>Please update</a></span>)}
                        </span>
                    </div>
                </li>
                <li className="item">
                <div className="iconContainer">
                    <div className="icon"><span className="icon__question"></span></div>
                </div>
                    
                    <div className="details">
                        <span className="details__text">
                            <span className="details__text__title">Change of plans? No Problem</span>
                            <p><a className="link editDetails_update" href={"https://moving2canada.com/go/account/"} >Edit your details here</a></p>
                        </span>
                    </div>                        
                </li>
                {/* <li className="item">
                    <div className="iconContainer">
                        <div className="icon"><span className="icon__notes"></span></div>
                    </div>
                    
                    <div className="details">
                        <ul className="sidebar__tasks details__text">
                        
                            <li><span className="details__text__title">Tasks ( {totalTasks} )</span></li>
                            <li><b>{importantTasks}</b> important {importantTasks === 1 ? <span>task</span> : <span>tasks</span>} to do</li>
                            <li><b>{completeTasks}</b> {completeTasks === 1 ? <span>task</span> : <span>tasks</span>} completed</li>
                            <li>
                                <b>Most recent task completed</b>
                                <div className="checklistTaskName__Text" dangerouslySetInnerHTML={{ __html: mostRecentTaskComplete }}/>   
                            </li>
                        </ul>
                    </div>                
                </li> */}
                <li className="item">
                    <div className="iconContainer">
                        <div className="icon mapleLeaf"><FaCanadianMapleLeaf size={35}/></div>
                    </div>
                    <div className="details">
                        <span className="details__text">
                            <span className="details__text__title"> Your immigration program:</span>
                            <p className="link" onClick={openModal}><strong>International Experience Canada (IEC)</strong></p>
                        </span>
                    </div>                        
                </li>
                <li className="item progressContainer">
                    <div><strong>( {completeTasks} ) </strong>task{completeTasks > 1 || completeTasks === 0 ? "s" : ""} completed</div>
                    <Progress max={allTasks} value={completeTasks}/>
                    
                    <div className="progressCount__text"><span>{completeTasks} out of {allTasks} completed</span></div>
                </li>
            </ul>
        </div>
        <div className="SidebarBtns__Container">
            <Button 
                className="arrow"
                onClick={() => { handleBtnClick() }}
            >
                Report a bug
            </Button>
            <Button
                className="arrow startTour"
                onClick={() => { handleTourBtnClick() }}
            >
                Take the tour
            </Button>
        </div>
        <Modal 
            show={modalOpen} 
            onClose={() => setModalOpen(openModal => false)}
            closeModal={() => setModalOpen(openModal => false)} 
            modal={{ closeOnBlur: true }}
            modalState={modalOpen} 
        >
           <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title style={{ alignItems: 'center', justifyContent: 'center' }}>
            <strong>International Experience Canada (IEC)</strong>
          </Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
            <Content>
                <p>
                Every year, tens of thousands of people from more than 30 countries come to Canada to live and work under the IEC program. Most come through the Working Holiday category, which allows you to work for any employer in Canada and to switch jobs and location after arrival. There are also Young Professionals and International Co-op categories.
                The IEC program is a great way to explore this amazing country. It’s also a chance to embark on a successful career in Canada, with opportunities to stay beyond your initial work permit.
                </p>
                <div className="video-container">
                    <iframe title="iecVideo" width="560" height="315" src="https://www.youtube.com/embed/M9yYNpkkQIA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="list is-hoverable">
                    <a href="https://moving2canada.com/iec-canada-visa/" target="_blank" rel="noopener noreferrer" className="list-item">
                        IEC Frequently Asked Questions
                    </a>
                    <a href="https://moving2canada.com/immigration/canadian-work-permits/international-experience-canada/" target="_blank" rel="noopener noreferrer" className="list-item">
                    More IEC resources
                    </a>
                </div>
                <p>Presently, this tool is only available to assist those individuals applying for the International Experience Canada program. Canada does offer other <a target="_blank" rel="noopener noreferrer" href="https://moving2canada.com/immigration-to-canada/">immigration pathways</a> for which you may be eligible. We are working to expand the tool to include those pathways in the future.</p>
            </Content>
        </Modal.Card.Body>
        {/* <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
          <p>
            Learn more about IEC
          </p>
        </Modal.Card.Foot> */}
      </Modal.Card>
        </Modal>
    </Columns.Column>
    )
}