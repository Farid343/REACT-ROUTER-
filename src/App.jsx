import axios from 'axios'
import './App.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setData(res.data)
      })
  }, [])

  const AddToCart = (item) => {
    let basket = JSON.parse(localStorage.getItem('basket')) || []
    let existingProduct = basket.find(x =>x.id == item.id)
    if(existingProduct){
      existingProduct.count += 1
    } else{
      basket = [...basket, item]
    }
    localStorage.setItem('basket', JSON.stringify(basket))
  }

  const AddToFav =(item) => {
    let favorite = JSON.parse(localStorage.getItem('favorite')) || []
    let existingProduct = favorite.find(x =>x.id == item.id)
    if(existingProduct){
      favorite = favorite.filter(x => x.id !== item.id);
    }else{
      favorite = [...favorite, item]
    }
    localStorage.setItem('favorite', JSON.stringify(favorite))
  }
  
  const navigation = useNavigate()

  return (
    <div className='Container'>
      <div className='title'>
        <h1>Məhsullar</h1>
        <div className='titleBtn'>
        <button onClick={() => navigation('/basket')} className='seb'> 
          <i className="bi bi-cart-check-fill"></i>
        </button>
        <button onClick={() => navigation('/favorite')} className='fav'>
          <i className="bi bi-heart-fill"></i>
        </button>
        </div>
      </div>
      <div className='Cards'>
        {data && data.map(item => (
          <div className='Card' key={item.id}>
            <img src={item.image} alt={item.title} className='imgbox' />
            <p>{item.title}</p>
            <span>{item.price}$</span>
            <div className='buttons'>
              <button onClick={() => AddToFav(item)} className='favoriteBtn'>
                <i className="bi bi-heart-fill"></i>
              </button>
              <button onClick={() => AddToCart(item)} onClickCapture className='basketBtn'>
                <i className="bi bi-cart2"></i> Səbətə əlavə et
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
