import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class InfoPage extends Component {
  
 state = {
    description: '',
    image_url: '',
  }

  componentDidMount () {
    this.props.dispatch({type:'FETCH_ITEMS'});
    console.log(this.props.itemList);
  }
    
  handleSubmit =() => {
    console.log( 'in handleSubmit', this. state);
    this.props.dispatch({type: 'NEW_OBJECT', payload: this.state})
  }
  
  handleChangeDesc = (event) => {
    console.log('in handleChangeDesc', event.target.value);
    this.setState({
      description: event.target.value
    })
  }

  handleChangeUrl = (event) => {
    console.log('in handleChangeUrl', event.target.value);
    this.setState({
      image_url: event.target.value
    })
  }

  handleDelete = (event, itemId) => {
    console.log('in handleDelete', itemId);
    this.props.dispatch({ type: 'DELETE', payload: itemId});
  }
  
  
  render(){
    return (
      
      <>
      <div>
        <p>Shelf Page </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={event => this.handleChangeDesc(event)} placeholder="New Object Description"></input>
            <input type="text" onChange={event => this.handleChangeUrl(event)} placeholder="Image Url"></input>
          <button type="submit">Add</button>
          </form>
          {/* <p> {JSON.stringify(this.props.items)} </p> */}
          <h4>Here are the Objects on My Shelf</h4>
          <ul>
          {this.props.items.map((items) => {
            return(
              <li>{items.description}
              <img src={items.image_url}/>
              <button onClick={event => this.handleDelete(event, items.id)}>Delete</button>
              </li>
              );
          })}
        </ul>
      </div>
        </>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  items: reduxStore.list,
});

InfoPage = withRouter(InfoPage);
export default connect(putPropsOnReduxStore)(InfoPage);
