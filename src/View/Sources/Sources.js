import * as React from "react";
import {getFilteredNews} from "../../client";
import News from "../News/News";

class Sources extends React.Component {
  state = {
    articles: [],
    isLoad: true
  }
  componentDidMount() {
    getFilteredNews(`sources=${this.props.query}`).then((res)=>{
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

export default Sources;