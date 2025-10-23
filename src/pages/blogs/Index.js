import React, { useState } from 'react';
import BlogList from './BlogList';
import BlogCreate from './BlogCreate';
import BlogFilter from './BlogFilter';

export default function Index() {
  let [searchKey, setSearchKey] = useState('');

  let handleSearch = (key) => {
    setSearchKey(key);
  };

  return (
    <div>
      <BlogFilter onSearch={handleSearch} />
      <BlogList searchKey={searchKey} />
    </div>
  )
}
