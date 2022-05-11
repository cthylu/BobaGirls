import React, { Component } from 'react'
import {connect} from 'react-redux'

export class Kit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tea : '',
            syrup: ''
        }
        this.initialState = this.state
    }
    render() {
        const { tea , syrup } = this.state;
        const { teas, syrups } = this.props;
        console.log( tea, 'teas', syrup, 'syrups')
        return (
            <div>
               <form>
                   <select>
                       <option name='tea' placeholder='Tea'></option>
                   </select>
                   <button className='addToCart'>Add To Cart</button>
               </form>
            </div>
        )
    }
}

const mapState = ( state ) => {
    const teas = state.products.filter((product) => product.key === 'tea')
    const syrups = state.products.filter((product) => product.key === 'syrup')
    return {
        teas,
        syrups
    }
}

const mapDispatch = dispatch => {
    return {
       addNewProduct: product => dispatch(addNewProduct(product, history)) 
    }  
}

export default connect(mapState, mapDispatch)(Kit)