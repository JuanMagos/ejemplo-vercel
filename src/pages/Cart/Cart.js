import { useContext, useState, useEffect } from 'react';
import { cartContext } from '../../context/CartProvider';
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import moment from 'moment';

const Cart = () => {
  const { cart } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const getTotalPrice = () => {
    setTotal(
      cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
    );
  };

  const createOrder = () => {
    const db = getFirestore();
    const query = collection(db, 'Order');
    const newOrder = {
      buyer: {
        name: formValues.name,
        phone: formValues.phone,
        email: formValues.email,
      },
      date: moment().format('DD/MM/YYYY'),
      items: cart,
      total: total,
    };
    addDoc(query, newOrder)
      .then((response) => {
        alert(`Orden creada con el id ${response.id}`);
        return response;
      })
      .then((res) => {
        cart.forEach((product) => {
          const query = doc(db, 'items', product.id);
          updateDoc(query, {
            stock: product.stock - product.quantity,
          });
        });
        // const orderDoc = doc(db, 'items',);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  const handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      {cart.map((product) => (
        <div
          key={product.id}
          style={{
            marginTop: '20px',
            padding: '40px',
            border: '1px solid gray',
          }}
        >
          <img
            alt={product.title}
            src={`/images/${product.imageId}`}
            width={'150px'}
          />
          <h2>{product.title}</h2>
          <h2>{product.price}</h2>
          <h2>{product.description}</h2>
          <h2>{product.quantity}</h2>
        </div>
      ))}
      <div>
        <h1>Total: {total} </h1>
        <button onClick={createOrder}>Crear orden</button>
        <div>
          <h2>Formulario</h2>
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <input
            name="phone"
            type="text"
            placeholder="Telefono"
            value={formValues.phone}
            onChange={handleInputChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
