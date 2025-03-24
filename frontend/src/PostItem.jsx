import React, { useState } from 'react';

function PostItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, description };

    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Item successfully posted:', data);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error posting item:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="itemDescription" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="itemDescription"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
}

export default PostItem;
