import React from 'react';
import $ from 'jquery';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = ({ edit: false });
  }

  deleteCard(e) {
    e.preventDefault();
    $.ajax({
      url: `/api/cards/${this.props._id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      this.props.deleteCard(this.props._id)
    }).fail(data => {
      console.log(data);
    });
  }

  updateCard(e) {
    e.preventDefault();
    let { name, description } = this.refs;
    $.ajax({
      url: `/api/cards/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name: name.value, description: description.value }
    }).done(card => {
      this.props.updateCard(card);
      name.value = null;
      description.value = null;
      this.toggleEdit();
    }).fail(data => {
      console.log(data);
    });
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  edit() {
    return(
      <div className="col s12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <input
              className="card-title"
              ref='name'
              defaultValue={this.props.name}
            />
            <textarea
              ref='description'
              defaultValue={this.props.description}
            >
            </textarea>
          </div>
          <div className="card-action">
            <button
              className='waves-effect waves-teal btn-flat white-text' 
              onClick={this.toggleEdit}
            >
              Cancel
            </button>
            <button
              className='waves-effect waves-teal btn-flat white-text' 
              onClick={this.updateCard}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }

  show() {
    return(
      <div className="col s12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.props.name}</span>
            <p>{this.props.description}</p>
          </div>
          <div className="card-action">
            <button
              className='waves-effect waves-teal btn-flat white-text'
              onClick={this.deleteCard}
            >
              Delete
            </button>
            <button
              className='waves-effect waves-teal btn-flat white-text'
              onClick={this.toggleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  render(){
    if(this.state.edit) {
      return this.edit();
    } else {
      return this.show();
    }
  }
}

export default Card;
