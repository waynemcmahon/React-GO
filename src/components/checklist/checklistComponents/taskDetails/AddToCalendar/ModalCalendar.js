import React, {useState} from 'react';
import { Modal, Content } from 'react-bulma-components/full';

export const ModalCalendar = ({onClose, show, modalOpen, items}) => {
    return (
    <Modal 
        show={modalOpen} 
        onClose={onClose}
        closeModal={onClose} 
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
        </Modal.Card>
    </Modal>
    )
}