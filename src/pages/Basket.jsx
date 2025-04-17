import React, { useEffect, useState } from 'react';
import styles from './Basket.module.css';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(items);
  }, []);

  const updateLocalStorage = (items) => {
    setBasketItems(items);
    localStorage.setItem('basket', JSON.stringify(items));
  };

  const removeFromBasket = (id) => {
    const updated = basketItems.filter(item => item.id !== id);
    updateLocalStorage(updated);
  };

  const increaseCount = (id) => {
    const updated = basketItems.map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    updateLocalStorage(updated);
  };

  const decreaseCount = (id) => {
    const updated = basketItems.map(item =>
      item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
    );
    updateLocalStorage(updated);
  };

  return (
    <div className={styles.basket}>
      <h2>Səbət</h2>
      <div className={styles.cards}>
        {basketItems.length === 0 ? (
          <p>Səbətdə heç bir məhsul yoxdur.</p>
        ) : (
          basketItems.map(item => (
            <div className={styles.card} key={item.id}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
              <span>{item.price}$</span>
              <div className={styles.counter}>
                <button onClick={() => decreaseCount(item.id)}>-</button>
                <p>{item.count}</p>
                <button onClick={() => increaseCount(item.id)}>+</button>
              </div>
              <button className={styles.delete} onClick={() => removeFromBasket(item.id)}>
                Səbətdən sil
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Basket;

