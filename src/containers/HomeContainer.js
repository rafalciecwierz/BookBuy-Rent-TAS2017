import React, { Component } from 'react';
import BookList from '../components/Books/BookList';

const HomeContainer = () => {
  return (
    <BookList
      name="Most popular"
      url='http://localhost:3001/api/books'/>
  );
}

export default HomeContainer;
