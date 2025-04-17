import React, { useEffect, useState } from 'react';
import styles from './Favorite.module.css'
const Favorite = () => {
  const [favItems, setFavItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('favorite')) || [];
    setFavItems(items);
  }, []);

  const toggleFavorite = (id) => {
    const updated = favItems.filter(item => item.id !== id);
    setFavItems(updated);
    localStorage.setItem('favorite', JSON.stringify(updated));
  };

  return (
    <div className={styles.favorite}>
      <h2>Favorilər</h2>
      <div className={styles.cards}>
      {favItems.length === 0 ? (
        <p className={styles.p}>Favori məhsul yoxdur.</p>
      ) : (
        favItems.map(item => (
          <div  className={styles.card} key={item.id}>
            <img src={item.image} alt={item.title}/>
            <p>{item.title}</p>
            <span>{item.price}$</span>
            <button className={styles.delete} onClick={() => toggleFavorite(item.id)}>Favoridən sil</button>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default Favorite;
