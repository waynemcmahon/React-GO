import React/* , { useState, useEffect } */ from "react";
//import { getArticlesForYou } from '../../data/GetData';
import { Columns } from "react-bulma-components/full";
import { ArticleImage as Image } from '../../elements/ArticleImage'; 
import { Event }  from '../../../components/tracking';

const ArticleList = ({limit, userArticles}) => {
  let shuffledArticles = [];
  /* const [hasError, setErrors] = useState(false);
  const [articles, setArticles] = useState([]);

  async function fetchData() {
    const res = await fetch(getArticlesForYou);
    res
      .json()
      .then(res => setArticles(res.acf.choose_articles))
      .catch(err => setErrors(err));
  }

  if(hasError){
    console.log(hasError);
  } */  

  /* useEffect(() => {
      fetchData();
  },[]); */

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function limitNumArticles(articles, limit){
    return articles.slice(0 , limit);
  }

  if(userArticles !== undefined){
    shuffledArticles = shuffleArray(userArticles);
  }
  

  if(limit !== -1){
    shuffledArticles = limitNumArticles(shuffledArticles, limit);
  }
  
  var forumDiscussionListStyle = {
    paddingBottom: '15px',
    fontWeight: '500',
  };

  const handleBtnClick = event => {
    Event("GO Activity", "Click", "GO Articles");
  }

  return (
    shuffledArticles.length ? (
        shuffledArticles.map((article, index) =>
        <div key={index} className="articleList__Container" style={forumDiscussionListStyle}>
        <Columns className="is-mobile" >
          <Columns.Column className="is-two-thirds" >
              <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={() => { handleBtnClick() }}>
                <div className="articleList__details">
                  <h4 className="articleList__details__Title">{article.title}</h4>
                  {/* <div className="articleList__details__Author">
                      <div className="articleList__details__Author__Icon__Container">
                        {
                          article.author !== undefined ? <span className="articleList__details__Author__Icon">{article.author.charAt(0)}</span> : <div></div>
                        }
                          
                      </div>
                      {
                        article.author !==undefined ?
                        <div className="articleList__details__Author__Name__Container">
                          <span className="articleList__details__Author__Name">{article.author}</span>
                        </div>
                        : 
                        <div></div>
                      }
                      
                  </div> */}
                </div>
              </a>
          </Columns.Column>
          <Columns.Column className="articleList__img__Container is-one-third">
            <Image link={article.url} alt={article.title} image={article.image}/>
          </Columns.Column>
          </Columns>
          </div>
    )
      ) : (
        <label>{/* No articles */}</label>
      )
  );


};
export default ArticleList;