import React from 'react';
import $ from 'jquery';

class BoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/boards',
      type: 'POST',
      dataType: 'JSON',
      data: { name: this.refs.name.value }
    }).done( board => {
      this.props.addBoard(board);
      this.refs.name.value = '';
    });
  }

  render() {
    return (
      <div className="center row">
        <form className='col s12 m4' onSubmit={this.handleSubmit}>
          <input placeholder="Name" ref="name" />
          <button className="btn">Add A Board</button>
        </form>
      </div>
    )
  }
}

export default BoardForm;
