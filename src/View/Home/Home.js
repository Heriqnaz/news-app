import * as React from "react";
import {getTopNews} from "../../client";
import News from "../News/News";

class Home extends React.Component{
  state = {
    articles: [],
    isLoad: true
  }
  componentDidMount() {
    getTopNews().then((res)=>{
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

export default Home;