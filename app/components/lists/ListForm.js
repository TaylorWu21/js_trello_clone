import React from 'react';
import $ from 'jquery';

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/lists',
      type: 'POST',
      dataType: 'JSON',
      data: { name: this.refs.name.value, boardId: this.props.boardId }
    }).done( list => {
      this.refs.name.value = '';
      this.props.addList(list);
    });
  }

  render() {
    return (
      <div className="center row">
        <form className="col s12 m4" onSubmit={this.handleSubmit}>
          <input ref="name" placeholder="List Name" required={true} />
          <button className="btn">Add List</button>
        </form>
      </div>
    )
  }
}

export default ListForm;
