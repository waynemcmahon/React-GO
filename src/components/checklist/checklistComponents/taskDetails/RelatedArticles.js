import React, { Component } from 'react';
import { getPosts } from '../../../data/GetData';
import axios from 'axios';

export default class RelatedArticles extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            posts: [],
            postList: "",
            categoryInt: "",
            authorName: ""
        };
        
    }
    componentDidMount() {
        let list = "";
        let categoryInt = "";
        console.log(this.props.taskCategory);
        let category = this.props.taskCategory;
        if(category === "Pre-Arrival"){
            this.setState({
                categoryInt: 7
            }) 
        }
        else if(category === "Employment"){
            this.setState({
                categoryInt: 6
            }) 
        }
        let postsUrl = getPosts + "?category=" + this.state.categoryInt;
        console.log(postsUrl);
        axios.get(postsUrl)
          .then(res => {      
                this.setState({ 
                    posts: res.data 
                });
               /*  console.log(this.state.posts);
                
                this.state.posts.map(function(post, i){
                    console.log(post);

                    return list = <li key={i}>{post.post_title}</li>
                }) */
                
                this.setState({
                    post: list
                }) 
          })
    }    

    render(){
        return(
            this.state.posts.map(function(post, i){
                return (
                    <div key={i} className="relatedArticles__Container">
                        <a href={post.guid} target="_blank" rel="noopener noreferrer">
                            <div className="relatedArticles__details">
                                <h4>{post.post_title}</h4>
                                <span>{post.post_author}</span>
                            </div>
                            <div className="relatedArticles__img">
                                <img alt={post.acf.module_headline} src={post.acf.module_image}/> 
                            </div>
                        </a>
                        
                        
                                               
                    </div>
                )
              }) 
        )
       
    }
        

          
}