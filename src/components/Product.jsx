import { useState } from 'react';
import '../styles/Product.css';
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
    <div className="pdtform-container">
      <form className="product-form" onSubmit={handleFormSubmit}>
        <label htmlFor="product-id"></label>
        <input
          type="text"
          id="product-id"
          autoFocus="true"
          value={pid}
          autoComplete='off'
          name="product-id"
          placeholder="Enter Product ID"
          onChange={e => setPid(e.target.value)}
        />
        <button type="submit">View</button>
        <button className='home' onClick={e => {
          e.preventDefault();
          navigate("/", {
            replace: true
          })
        }}>Home</button>
      </form>

    </div>
  );
};

export default Product;
