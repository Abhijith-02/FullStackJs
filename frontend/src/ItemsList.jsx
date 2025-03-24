import React, { useEffect, useState } from 'react';

function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2 className='text-center bg-dark text-white m-0 p-'>Items List</h2>
      <ul className='text-center bg-danger text-white list-style-none p-5'>
        {items.map((item) => (
          <li key={item._id}><h4 className='m-1 p-2 '>{item._id} : {item.name} : {item.description}</h4></li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
