import React from 'react';
import ListForm from './ListForm';
import List from './List';
import $ from 'jquery';

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.state = ({ lists: [] });
  }

  componentWillMount() {
    $.ajax({
      url: '/api/lists',
      type: 'GET',
      dataType: 'JSON',
      data: { boardId: this.props.boardId }
    }).done( lists => {
      this.setState({ lists });
    });
  }

  addList(list) {
    this.setState({ lists: [...this.state.lists, list] });
  }

  deleteList(id) {
    this.setState({ lists: this.state.lists.filter( l => l._id !== id) })
  }

  updateList(list) {
    let lists = this.state.lists.map( l => {
      if (l._id === list._id)
        return list;
      return l;
    });
    this.setState({ lists });
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(
        <List
          key={list._id}
          {...list}
          deleteList={this.deleteList}
          updateList={this.updateList}
        />
      );
    });
    return (
      <div>
      <ListForm boardId={this.props.boardId} addList={this.addList} />
        <div className="row">
          {lists}
        </div>
      </div>
    )
  }
}

export default Lists;
