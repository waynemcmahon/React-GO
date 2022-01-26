import React from 'react';
import { Box } from 'react-bulma-components/full';
import { FaCaretRight } from "react-icons/fa";
import ArticlesList from './ArticlesList';
import NoteIcon from './images/book.png';

export const ArticlesModule = ({ userArticles }) => {

    
    const handleBtnClick = event => {
        document.getElementById('articlesLinkBtn').click();
    }

    return (
    <Box className="articleModule module">
        <div className="module__headerContainer">
            <span className="module__imgContainer">
                <img alt="noteIcon" src={NoteIcon}/>
            </span>
            <span className="module__subtitle subtitle">Articles For You</span>
            <span className="module__view-all" onClick={() => { handleBtnClick() }}>View all</span>
        </div>
        
        <ArticlesList
            limit={3}
            userArticles={userArticles}
        />
        <p className="module__view-all_arrow red uppercase bold-heavy" onClick={() => { handleBtnClick() }}>See all articles recommended for you<FaCaretRight className="arrow-right" /></p>

    </Box>
    )
    
}