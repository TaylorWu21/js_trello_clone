import React from 'react';
import $ from 'jquery';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.state = { edit: false }
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  updateBoard() {
    let { name, description } = this.refs;
    $.ajax({
      url: `/boards/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name: name.value, description: description.value }
    }).done( board => {
      this.props.updateBoard(board);
      name.value = '';
      description.value = '';
      this.toggleEdit();
    });
  }

  deleteBoard() {
    $.ajax({
      url: `/boards/${this.props._id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      this.props.deleteBoard(this.props._id);
    });
  }

  show() {
    return (
      <div className="col s12 m3">
        <div className="card blue-grey">
          <div className="card-content white-text">
            <span
              className="card-title"
              onClick={this.toggleEdit}
            >
              {this.props.name}
            </span>
            <p>{this.props.description || "Click board name to edit"}</p>
          </div>
          <div className="card-action">
            <button className="btn" onClick={this.deleteBoard}>Delete</button>
            <a href={`/boards/${this.props._id}`} className="btn">Show</a>
          </div>
        </div>
      </div>
    );
  }

  edit() {
    return(
      <div className='col s12 m3'>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <input
              required={true}
              ref='name'
              placeholder='name'
              defaultValue={this.props.name}
            />
            <textarea ref='description'>{this.props.description}</textarea>
          </div>
          <div className='card-action'>
            <button className='btn' onClick={this.toggleEdit}>Cancel</button>
            <button className='btn' onClick={this.updateBoard}>Update</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.edit)
      return this.edit();
    else
      return this.show();
  }
}

export default Board;
