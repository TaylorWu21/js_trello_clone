import React from 'react';
import Lists from '../components/lists/Lists';

const BoardPage = ({ boardId }) => (
<div>
  <Lists boardId={boardId} />
</div>
);

export default BoardPage;
