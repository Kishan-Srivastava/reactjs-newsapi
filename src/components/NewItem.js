import React, { Component } from 'react'

export default class NewItem extends Component { 
  render() {
    let {title,desc,imageUrl,newsUrl,author,date,source} = this.props;
    // Extacting the values in variables from this.props
    return (
        <div className="card" > 
        <span style={{position:"absolute",top:"0",left:"75%",zIndex:"1"}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger" >{source}</span>
        <img src={!imageUrl?"https://wallpaperaccess.com/full/1622642.jpg":imageUrl} className="card-img-top" alt="Card pic" />
        <div className="card-body">
          <h5 className="card-title">{title?title:"No title for the news Please Click Read More"}</h5>
          <p className="card-text">
            {desc?desc:"No description for the news Please Click Read More"}
          </p>
          <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} at {new Date(date).toUTCString()}</small></p>
          <a href={newsUrl} rel="noopener" target='_blank' className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    )
  }

  // style={{position:"absolute",top:"0",left:"75%",zIndex:"1"}}
}

