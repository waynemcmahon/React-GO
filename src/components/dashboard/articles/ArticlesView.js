import React, { useEffect } from 'react';
import { Columns } from 'react-bulma-components/full';
import ArticleListViewAll from './ArticleListViewAll';

export const ArticlesView = ({ changeHeaderText, changeBreadcrumb, userArticles }) => {
    let link = [
        {"title" : "Dashboard", "active" : false, "link" : "dashboard"},
        {"title" : "Articles", "active" : true, "link" : "articles"},
    ];
    useEffect(() => {
       changeBreadcrumb(link);
   }, [changeBreadcrumb]);

    let title = "Articles For You";
     useEffect(() => {
        changeHeaderText(title);
    }, [changeHeaderText, title]);

    return(
        <Columns className="articleList__Container article-block__Container">
            <ArticleListViewAll 
                limit={-1}
                userArticles={userArticles}
            />
        </Columns>
    )
}