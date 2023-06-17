import NewItem from "./NewItem";
import Spinner from "./Spinner";

import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  constructor(props) {
    super(props);
    //Passing props to constructor to use props inside the constructor
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResult: 0,
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.loadData = this.loadData.bind(this);
    this.props.setProgress(10);
    //console.log("Props for News : "+this.props.country);
  }
  async loadData() {
    // Promises in JS
    this.props.setProgress(30);
    this.setState({loading : true, articles: []});
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=8eb3b0c65d164ddea8510f54933569b3&page=${this.state.page}&pageSize=10`
    );
    this.props.setProgress(20);
    let data = await response.json();
    // Await will hold the code execution until the function is executed
    console.log(data.articles);
    this.props.setProgress(40);
    if(data.status === "error") { console.log("No data");
    this.setState({
      articles: [],
      totalResult: 0,
      loading: false
    });
    }
    else{
    this.setState({
      articles: data.articles,
      totalResult: data.totalResults,
      loading: false
    });}
  }
  async componentDidMount() {
    //Life cycle method which is called after render only once better for API Call
    console.log("Did Mount: " + this.props.category);
    this.loadData();
  }

  // componentDidUpdate(pP, ps) {
    // This is life cycle method which is invoked whenever there is change in props or state
  //   console.log(pP);
  //   if (this.props.country && this.props.country !== pP.country) {
  //     this.setState({page: 1},()=>{
  //       this.loadData();
  //     })
      
  //   }
  //   this.loadData();
  // }
  fetchMoreData = async()=>{
    this.props.setProgress(20);
    // this.setState({loading : true});
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=8eb3b0c65d164ddea8510f54933569b3&page=${this.state.page}&pageSize=10`
    );
    this.props.setProgress(30);
    let data = await response.json();
    this.props.setProgress(40);
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResult: data.totalResults
    })
  }
  async handlePrevious() {
    //Handling Previous button functionality by changing the Page value , later it is used in API call
    console.log("Previous clicked");
    this.setState({page: this.state.page - 1},()=>{
      this.loadData();
    });
    window.scrollTo({
      //This is for scrolling effect 
      top: 0,
      behavior: "smooth",
    });
  }

  async handleNext() {
    //Handling the next functionality
    console.log("Next clicked " + this.state.page);
    this.setState({page: this.state.page + 1},()=>{
      this.loadData();
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  render() {
    return (
      <>
      {/* Loading Spinner when loading is true */}
      <div className="text-center m-3"><h1>Top Headlines for {this.props.category}</h1></div>
    {this.state.loading && <Spinner />} 
    <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.totalResult !== this.state.articles.length}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles && this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewItem
                    imageUrl={element.urlToImage}
                    title={element.title}
                    desc={element.description}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            {/* <div className="d-flex justify-content-between my-3">
              <button
                type="button"
                disabled={this.state.page <= 1}
                className="btn btn-dark"
                onClick={this.handlePrevious}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.handleNext}
                disabled={
                  this.state.page + 1 > Math.ceil(this.state.totalResult / 10)
                }
              >
                Next &rarr;
              </button>
            </div> */}
          </div>
        </div>
        </InfiniteScroll>
        
        </>
    );
  }
}
