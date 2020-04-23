import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class InfoPage extends Component {
  
 state = {
    description: '',
    image_url: '',
  }

  componentDidMount () {
    this.props.dispatch({type:'FETCH_ITEMS'})
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
  
  render(){
    return (
      <>
      <div>
        <p>Shelf Page </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={event => this.handleChangeDesc(event)} placeholder="New Object Description"></input>
            <input type="text" onChange={event => this.handleChangeUrl(event)} placeholder="Image Url"></input>
          <button type="submit">Add Button</button>
        </form>
        {JSON.stringify(this.props.itemList)}
        <ul>
          {this.props.itemList ?
          this.props.itemList.map(item => {
            return(
              <>
              <li key={item.id}>{item.description}</li>
              <li><img src={item.url} /></li>
              </>
            );
          })
            :
          <p>Nothin!</p>
          }
        </ul> 
      </div>
      </>
    );
  }
}

const putPropsOnReduxStore = (reduxStore) => ({
  itemList: reduxStore.getListReducer,
});

InfoPage = withRouter(InfoPage);
export default connect(putPropsOnReduxStore)(InfoPage);
