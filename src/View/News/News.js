import * as React from "react";
import New from "../New/New";

class News extends React.Component {
  render() {
    const newsComponent = this.props.articles.map((article) => (
      <New
        key={`news-${article.publishedAt}-${article.title}`}
        article={article}
      />
    ))
    return (
      <div className="home-page">
        {this.props.articles && this.props.articles.length ? newsComponent :
          <div className="loader">
            {this.props.isLoad ? <div className="spinner-border text-primary"></div> : 'No data'}
          </div>}
      </div>
    )
  }
}

export default News;