import * as React from "react";
import * as moment from "moment";

import '../../Styles/style.css';

class New extends React.Component {
  render() {
    return (
      <div className="content">
        <div className='item'>
          <div>
            <img className="article-img" src={this.props.article.urlToImage} alt=''/>
          </div>
          <div >
            <h2><a href={this.props.article.url} target='_blank' rel="noopener noreferrer">{this.props.article.title}</a></h2>
            <p>By {this.props.article.author} on {moment(this.props.article.publishedAt).format('LL')}</p>
            <div>{this.props.article.description}</div>
          </div>
        </div>
      </div>
    )
  }

}

export default New;