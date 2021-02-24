import React, {Component} from 'react';


class SearchButton extends Component {
  render () {
    return (
      <div className='d-flex justify-content-center m-3'>
        <button className='btn btn-warning text-white'>Search</button>
      </div>
    )
  }
}

export default SearchButton;