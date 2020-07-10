import * as React from "react";
import {getArticleBySearchText} from "../../client";
import News from "../News/News";

class Search extends React.Component {
  state = {
    articles: [],
    isLoad: true,
  }
  componentDidMount() {
   this.getArticles();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getArticles();
    }
  }
  getArticles = () => {
    getArticleBySearchText(this.props.location.search).then((res)=>{
      this.setState({
        articles: res.articles,
        isLoad: false
      })
    })
  }

  render() {
    return (
      <News
        articles={this.state.articles}
        isLoad={this.state.isLoad}
      />
    )
  }

}
export default Search;