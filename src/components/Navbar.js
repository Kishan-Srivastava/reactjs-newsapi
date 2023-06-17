import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    // this.state={
    //   category : this.props.category_type[0]
    // }
    //console.log("From NavBar Constructor : "+this.props.category_type[0])
    //this.handleQuery = this.handleQuery.bind(this);
    //this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
  }
  // onChangeQuery = (e) => {
  //   this.props.handleSearch( 
  //      e.target.value );
  // };
  // handleQuery() {
  //   this.props.handleSearch(this.props.query);
  // }
  // handleOnChangeCategory(e)
  // {
  //   this.setState({category:e.target.value})
  //   this.props.handleSelectedCategory(e.target.value)
  // }
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            NewsMonkey
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/generalhealth">General Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            {/* <form className="d-flex" role="search">
              <select value={this.state.category} onChange={(e)=>{this.handleOnChangeCategory(e)}}>
                {this.props.category_type.map((catg,index)=>{
                  return <option key={index} value={catg}>{catg}</option>
                })}
              </select>
              <input
                className="form-control me-2"
                type="search"
                placeholder={this.props.query}
                aria-label="Search"
                value={this.props.query}
                onChange={this.onChangeQuery}
              />
            </form> */}
          </div>
        </div>
      </nav>
    );
  }
}
