import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <Link to={`item/${product.id}`}>
      <div style={{ border: '1px solid red' }}>
        <img
          width={'300px'}
          alt={product.title}
          src={`images/${product.imageId}`}
        />
        <h2>{product.title}</h2>
        <h2>{product.description}</h2>
        <h2>{product.price}</h2>
        <h2>Existencia: {product.stock} productos</h2>
      </div>
    </Link>
  );
};

export default Item;
