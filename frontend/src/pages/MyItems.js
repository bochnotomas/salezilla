import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../features/items/itemsSlice';

function MyItems() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getItems());
    }
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item._id}>
          <ul>
            <li>{item.itemname}</li>
            <img
              src={`./images/${item.photo}`}
              alt=''
              style={{ width: '200px' }}
            />
            <li>{item.createdAt}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default MyItems;
