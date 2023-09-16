import React, { useState } from 'react';

const AddProductCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category Name:', categoryName);
    setCategoryName('');
  };
  return (
<div className="add-product-category">
      <h2>Add Product Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e)=>setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddProductCategory
