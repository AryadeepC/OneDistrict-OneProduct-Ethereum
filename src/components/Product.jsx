import { useState } from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate()
  const [pid, setPid] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate("/product/" + pid, {
      replace: false
    });
  }
  return (
    <div className="form-container">
      <form className="product-form" onSubmit={handleFormSubmit}>
        <label htmlFor="product-id">Product ID:</label>
        <input
          type="text"
          id="product-id"
          value={pid}
          name="product-id"
          placeholder="Enter Product ID"
          onChange={e => setPid(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Product;
