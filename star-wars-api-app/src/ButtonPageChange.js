import React, {Component} from 'react';


class ButtonPageChange extends Component {
 render () {
    return (
      <div className='d-flex justify-content-center m-3'>
      <button onClick={this.props.onClick} value="1" className='btn btn-warning text-white'>1</button>
      <button onClick={this.props.onClick} value="2" className='btn btn-warning text-white'>2</button>
      <button onClick={this.props.onClick} value="3" className='btn btn-warning text-white'>3</button>
      <button onClick={this.props.onClick} value="4" className='btn btn-warning text-white'>4</button>
      <button onClick={this.props.onClick} value="5" className='btn btn-warning text-white'>5</button>
      <button onClick={this.props.onClick} value="6" className='btn btn-warning text-white'>6</button>
      <button onClick={this.props.onClick} value="7" className='btn btn-warning text-white'>7</button>
      <button onClick={this.props.onClick} value="8" className='btn btn-warning text-white'>8</button>
      <button onClick={this.props.onClick} value="9" className='btn btn-warning text-white'>9</button>
    </div>
    )
  }
}


export default ButtonPageChange;