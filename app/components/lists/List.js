import React from 'react';
import CardForm from '../cards/CardForm';
import Card from '../cards/Card';
import $ from 'jquery';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = { cards: [], edit: false }
  }

  componentWillMount() {
    $.ajax({
      url: '/api/cards',
      type: 'GET',
      dataType: 'JSON',
      data: { listId: this.props._id }
    }).done( cards => {
      this.setState({ cards });
    });
  }

  updateList(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    $.ajax({
      url: `/api/lists/${this.props._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { name }
    }).done( list => {
      this.props.updateList(list);
      this.refs.name.value = null;
      this.setState({ edit: !this.state.edit });
    }).fail(data => {
      console.log(data);
    });
  }

  deleteList() {
    $.ajax({
      url: `/api/lists/${this.props._id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      this.props.deleteList(this.props._id)
    });
  }

  deleteCard(id) {
    this.setState({ cards: this.state.cards.filter( c => c._id !== id ) });
  }

  updateCard(card) {
    let cards = this.state.cards.map( c => {
      if (card._id === c._id)
        return card;
      return c;
    });
    this.setState({ cards });
  }

  addCard(card) {
    this.setState({ cards: [...this.state.cards, card] });
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  edit() {
    return(
      <div className="col s12 m2">
        <form onSubmit={this.updateList}>
          <input
            ref='name'
            defaultValue={this.props.name}
            required={true}
          />
          <button className='btn' onClick={this.toggleEdit}>Cancel</button>
          <button className='btn' onClick={this.updateList}>Update</button>
        </form>
      </div>
    )
  }

  render() {
    let cards = this.state.cards.map( card => {
      return (
        <Card
          key={card._id}
          {...card}
          deleteCard={this.deleteCard}
          updateCard={this.updateCard}
        />
      );
    });
    // RENDER
    if(this.state.edit) {
      return this.edit();
    } else {
      return(
        <div className="col s12 m2">
          <button onClick={this.deleteList} className="btn">Delete</button>
          <button onClick={this.toggleEdit} className='btn'>Edit</button>
          <h3 className="center">{this.props.name}</h3>
          <hr />
          <CardForm addCard={this.addCard} listId={this.props._id} />
          {cards}
        </div>
      );
    }
  }
}

export default List;
