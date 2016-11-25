import React from 'react';
import ReactDOM from 'react-dom';
import BoardPage from './containers/BoardPage';

let boardId = window.location.pathname.split("/boards/")[1];

ReactDOM.render(<BoardPage boardId={boardId} />, document.getElementById('content'));
