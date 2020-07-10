import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./View/Home/Home";
import Header from "./View/Header/Header";
import {getSources, getTopNews} from "./client";
import Sources from "./View/Sources/Sources";
import Search from "./View/Search/Search";

class App extends React.Component {
  state = {
    articles: [],
    sources: []
  }
  componentDidMount() {
    getTopNews().then((res)=>{
      this.setState({
        articles: res.articles
      })
    });
    getSources().then((res)=>{
      const data = res.sources.slice(0, 5);
      this.setState({
        sources: data
      })
    })
  }

  render () {
    const router = this.state.sources.map((source) => (
      <Route
        key={`source-${source.id}`}
        path={`/${source.id}`}
        render={() => {
          return (
            <Sources
              query={source.id}
            />
          );
        }}
      />
    ))
    return (
      <Router>
        <Header></Header>
        <div>
          <Switch>
            <Route  path='/search' component={Search} />
            {router}
            <Route exect  path='/home' component={Home} />
            <Route exect  path='/' render={() => {
              return (
                <Redirect
                  to='/home'
                />
              );
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
