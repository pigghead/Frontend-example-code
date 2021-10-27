import React from 'react'

const Searchbar = (props) => (
  <form className='searchbar' onSubmit={(e) => props.handleSubmit(e)}>
    <label htmlFor='header-search'>
    </label>
    <input 
      type='text'
      id='header-search'
      name='search'
      placeholder='enter github user...'
      onChange={(e) => props.handleSearch(e)}
    />
    <button className='searchbar__btn' type='submit'>search</button>
  </form>
)

export default Searchbar;