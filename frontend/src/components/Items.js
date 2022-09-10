import React from 'react';

function Items({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>{item.itemname}</li>
      ))}
    </ul>
  );
}

export default Items;
