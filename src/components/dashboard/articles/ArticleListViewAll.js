import React from "react";
import { Columns, Box } from "react-bulma-components/full";
import { ArticleImage as Image } from '../../elements/ArticleImage';
import { Event }  from '../../tracking/index';

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
  }

  useEffect(() => {
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
    return shuffledArticles.slice(0 , limit);
  }

  if(userArticles !== undefined){
    shuffledArticles = shuffleArray(userArticles);
  }
  

  if(limit !== -1){
    shuffledArticles = limitNumArticles(shuffledArticles, limit);
  }

  const handleBtnClick = event => {
    Event("GO Activity", "Click", "GO Articles");
  }

  return (
    shuffledArticles.length ? (
        shuffledArticles.map((article, index) =>
            <Columns.Column className="is-half-tablet article-block" key={index} >
                <Box>
                    
                    <Image link={article.url} alt={article.title} image={article.image}/>
                    <div className="articleList__details">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={() => { handleBtnClick() }}>
                            <h4 className="articleList__details__Title">{article.title}</h4>
                        </a>
                        {
                            article.excerpt !== undefined ?
                            <div className="articleList__details__Excerpt__Container">
                            <p className="articleList__details__Excerpt">{article.excerpt}</p>
                            </div>
                            :
                            <div></div>
                        }
                        {/* <div className="readMore__Container">
                          <a className="module__view-all_arrow red uppercase bold-heavy" >Read more<FaCaretRight className="arrow-right" /></a>
                        </div> */}
                        
                        <div className="articleList__details__Author">
                            <div className="articleList__details__Author__Icon__Container">
                                {
                                article.author !== undefined ? <span className="articleList__details__Author__Icon">{article.author.charAt(0)}</span> : <div></div>
                                }
                                
                            </div>
                            {
                                article.author !==undefined ?
                                <div className="articleView__details__Author__Name__Container">
                                <span className="articleList__details__Author__Name">{article.author}</span>
                                </div>
                                : 
                                <div></div>
                            }
                            
                        </div>
                    </div>
                </Box>
          </Columns.Column>
    )
      ) : (
        <label>{/* No articles */}</label>
      )
  );


};
export default ArticleList;