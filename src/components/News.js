import { useEffect } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";


const News = (props) => {
  // constructor(props) {
  //   super(props);
  //   //Passing props to constructor to use props inside the constructor
  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResult: 0,
  //   };
  //   this.handlePrevious = this.handlePrevious.bind(this);
  //   this.handleNext = this.handleNext.bind(this);
  //   this.loadData = this.loadData.bind(this);
  //   this.props.setProgress(10);
  //   //console.log("Props for News : "+this.props.country);
  // }
  useEffect(()=>{
    document.title = capatalize(props.category)+ " - Top Headlines"
    loadData();
  },[props.category]);

  const [sstate,setSState] = useState({
    articles: [],
    loading: true,
    page: 1,
    totalResult : 0
  });
  const capatalize = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const loadData = async ()=> {
    // Promises in JS
    console.log("Load Data: "+props.category)
    props.setProgress(30);
    window.scrollTo({
          //This is for scrolling effect 
          top: 0,
          behavior: "smooth",
        });
    //setSState({loading : true, articles: []});
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=8eb3b0c65d164ddea8510f54933569b3&page=1&pageSize=10`
    );
    props.setProgress(40);
    let data = await response.json();
    // Await will hold the code execution until the function is executed
    console.log(data.articles);
    props.setProgress(60);
    if(data.status === "error") { console.log("No data");
    setSState({
      articles: [],
      totalResult: 0,
      loading: false,
      page: 1
    });

    }
    else{
      setSState({
      articles: data.articles,
      totalResult: data.totalResults,
      loading: false,
      page: 1
    });}
    props.setProgress(100);
  }
  // async componentDidMount() {
  //   //Life cycle method which is called after render only once better for API Call
  //   console.log("Did Mount: " + this.props.category);
  //   this.loadData();
  // }

  // componentDidUpdate(pP, ps) {
  //   //This is life cycle method which is invoked whenever there is change in props or state
  //   console.log(pP);
  //   if (this.props.category && this.props.category !== pP.category) {
  //       this.loadData();
  //     }
      
  
  //   //this.loadData();
  // }
  const fetchMoreData = async()=>{
    props.setProgress(20);
    setSState(prevObj => ({...prevObj,loading : true}));
    console.log("Fetch more ");
    console.log(sstate);
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=8eb3b0c65d164ddea8510f54933569b3&page=${sstate.page+1}&pageSize=10`
    );
    props.setProgress(40);
    let data = await response.json();
    props.setProgress(70);
    if(data.status === "error") { console.log("No data");
    setSState({
      articles: [],
      totalResult: 0,
      loading: false,
      page: 1
    });

    }
    else{
      setSState({
        articles: sstate.articles.concat(data.articles),
        totalResult: data.totalResults,
        page: sstate.page + 1
      });}
    
    props.setProgress(100);
  }
  // const handlePrevious = async () => {
  //   //Handling Previous button functionality by changing the Page value , later it is used in API call
  //   console.log("Previous clicked");
  //   this.setState({page: this.state.page - 1},()=>{
  //     this.loadData();
  //   });
  //   window.scrollTo({
  //     //This is for scrolling effect 
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  // const handleNext = async ()=> {
  //   //Handling the next functionality
  //   console.log("Next clicked " + this.state.page);
  //   this.setState({page: this.state.page + 1},()=>{
  //     this.loadData();
  //   });
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }
    return (
      <>
      {/* Loading Spinner when loading is true */}
      <div className="text-center m-3" ><h1 style={{'margin':'60px 30px'}}>Top Headlines for {capatalize(props.category)}</h1></div>
    {sstate.loading && <Spinner />} 
    <InfiniteScroll
          dataLength={sstate.articles.length}
          next={fetchMoreData}
          hasMore={sstate.totalResult !== sstate.articles.length}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {sstate.articles && sstate.articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewItem
                    imageUrl={!element.urlToImage?null:element.urlToImage}
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

  export default News;