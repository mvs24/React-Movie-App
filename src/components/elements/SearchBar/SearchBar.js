import React, { Component } from 'react';
import './SearchBar.css';

export default class SearchBar extends Component {
 
  state={
      value:''
    }

  timeout=null;

  doSearch=(e)=>{
    this.setState({
      value:e.target.value
    })
    clearTimeout(this.timeout);
    this.timeout=setTimeout(()=>{
      this.props.callback(this.state.value)
    },500)
  }
  

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <input type="text" className="rmdb-searchbar-input" 
          placeholder="Search" 
          onChange={this.doSearch}
          value={this.state.value}
          />
        </div>
      </div>
    )
  }
}
