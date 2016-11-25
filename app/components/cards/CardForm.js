import React from 'react';
import $ from 'jquery';

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let { name, description, form } = this.refs;
    $.ajax({
      url: '/api/cards',
      type: 'POST',
      dataType: 'JSON',
      data: { name: name.value, description: description.value, listId: this.props.listId }
    }).done( card => {
      this.props.addCard(card);
      form.reset();
    });
  }

  render() {
    return (
      <div className="center">
        <form ref="form" onSubmit={this.handleSubmit}>
          <input ref="name" placeholder="name" />
          <textarea ref="description"></textarea>
          <button className="btn">Add</button>
        </form>
      </div>)
  }
}

export default CardForm;



