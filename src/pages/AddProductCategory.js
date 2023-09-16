import React, { useState } from 'react';

const AddProductCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Category Name:', categoryName);
    setCategoryName('');
  };
  return (
<div className="home">

    </div>
  )
}

export default AddProductCategory
