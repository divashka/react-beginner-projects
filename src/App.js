import React, { useEffect, useState } from 'react';
import './index.scss';
import Collection from './collection';

const cats = [
 { "name": "Все" },
 { "name": "Море" },
 { "name": "Горы" },
 { "name": "Архитектура" },
 { "name": "Города" }
]

function App() {
 const [categoryId, setCategoryId] = useState(0);
 const [collections, setCollections] = useState([]);
 const [searchValue, setSearchValue] = useState('');
 const [isLoading, setIsLoading] = useState(true);
 const [page, setPage] = useState(1);

 console.log(page)

 useEffect(() => {
  setIsLoading(true);

  const category = categoryId ? `category=${categoryId}` : '';

  fetch(`https://65be8828dcfcce42a6f2a102.mockapi.io/photos?page=${page}&limit=3&${category}`)
   .then((res) => res.json())
   .then((json) => setCollections(json))
   .catch(() => console.log('Ошибка загрузки'))
   .finally(() => setIsLoading(false));
 }, [categoryId, page]);

 return (
  <div className="App">
   <h1>Моя коллекция фотографий</h1>
   <div className="top">
    <ul className="tags">
     {cats.map((cat, index) => (
      <li
       className={categoryId === index ? 'active' : ''}
       onClick={() => setCategoryId(index)}
       key={cat.name}>{cat.name}</li>
     ))}
    </ul>
    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
   </div>
   <div className="content">
    {isLoading
     ? <h2>Идет загрузка...</h2>
     :
     collections
      .filter((collection) => {
       return collection.name.toLowerCase().includes(searchValue.toLowerCase())
      })
      .map((collection, index) => (
       <Collection
        key={index}
        name={collection.name}
        images={collection.photos}
       />
      ))
    }
   </div>
   <ul className="pagination">
    {
     [...Array(5)].map((_, index) => (
      <li onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>{index + 1}</li>
     ))
    }
   </ul>
  </div>
 );
}

export default App;
