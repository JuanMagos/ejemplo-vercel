// import { data } from '../../data/data';
import { useState, useEffect } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import { useParams } from 'react-router-dom';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();

  const getProducts = () => {
    const db = getFirestore();
    const queryBase = collection(db, 'items');

    const querySnapshot = categoryName
      ? query(queryBase, where('categoryId', '==', categoryName))
      : queryBase;

    getDocs(querySnapshot)
      .then((response) => {
        const data = response.docs.map((item) => {
          return { id: item.id, ...item.data() };
        });
        setItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return <div>{<ItemList products={items} />}</div>;
};

export default ItemListContainer;
