import React from 'react';
import Board from './Board';
import BoardForm from './BoardForm';
import $ from 'jquery';

class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.state = { boards: [] }
  }

  componentWillMount() {
    $.ajax({
      url: '/boards',
      type: 'GET',
      dataType: 'JSON'
    }).done( boards => {
      this.setState({ boards });
    });
  }

  addBoard(board) {
    this.setState({ boards: [...this.state.boards, board] });
  }

  deleteBoard(id) {
    this.setState({ boards: this.state.boards.filter( b => b._id !== id ) });
  }

  updateBoard(board) {
    let boards = this.state.boards.map( b => {
      if (b._id === board._id)
        return board;
      return b;
    });
    this.setState({ boards });
  }

  render() {
    let boards = this.state.boards.map( board => {
      return (
        <Board
          key={board._id}
          updateBoard={this.updateBoard}
          deleteBoard={this.deleteBoard}
          {...board}
        />
      )
    });

    return (
      <div>
        <BoardForm addBoard={this.addBoard} />
        <div className="row">
         {boards}
        </div>
      </div>
    )
  }
}

export default Boards;
