import React from 'react';
import { Columns } from "react-bulma-components/full"
import { ArticleImage } from '../../../elements/ArticleImage';

export const RelatedResources = ({taskDetailsTask, taskResources}) => {
    let post =  [];
    let postsArray = [];
    post.title = "";
    post.link = [];
    post.author = [];
    post.image = [];
    post.alt = [];
    let title = "";

    if(taskDetailsTask.relatedTitle !== undefined){
        title = <p className="title">Helpful Resources</p>  
        for (let i = 0; i < taskDetailsTask.relatedTitle.length; i++) {
            post = [];
                if(taskDetailsTask.relatedTitle[i] !== ""){
                    post.title = taskDetailsTask.relatedTitle[i];
                    post.author = taskDetailsTask.relatedAuthor[i];
                    post.link = taskDetailsTask.relatedLink[i];
                    post.image = taskDetailsTask.relatedImage[i];
                    post.alt = taskDetailsTask.relatedImageAlt[i];
    
                    postsArray.push(post);
                }
        } 
    }

    return(
        {title},
        postsArray.map(function(post, i){  
            return (                        
                <div key={i} className="relatedResources__Container articleList__Container">
                    {
                        i === 0 ? title : <div></div> 
                    }
                    <Columns className="is-mobile">
                            <Columns.Column className="is-three-quarters-tablet is-two-thirds-mobile" >
                                <a href={post.link} target="_blank" rel="noopener noreferrer">
                                    <div className="articleList__details">
                                        <h4 className="articleList__details__Title">{post.title}</h4> 
                                        <div className="articleList__details__Author">
                                            <div className="articleList__details__Author__Icon__Container">
                                                <span className="articleList__details__Author__Icon">{post.author.charAt(0)}</span>
                                            </div>
                                            <div className="articleList__details__Author__Name__Container">
                                                <span className="articleList__details__Author__Name">By {post.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Columns.Column>
                            <Columns.Column className="articleList__img__Container is-one-quarter-tablet is-one-third-mobile">
                                <ArticleImage link={post.link} alt={post.alt} image={post.image}/>
                            </Columns.Column>
                    </Columns>              
                </div> 
            )
        }
    )    
)}