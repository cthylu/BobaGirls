import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '/client/store'

export class Kit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teaName: '',
            syrupName: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addProductToCart = this.addProductToCart.bind(this);
    }
    addProductToCart(product) {
        const quantity = 1;
        this.props.addToCart(product, quantity);
    }
    handleSubmit(ev) {
        ev.preventDefault()
        console.log(this.state)
    }
    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    render() {
        const { teaName, syrupName } = this.state;
        const { teas, syrups, product } = this.props
        const { handleChange, handleSubmit, addProductToCart } = this;
        return (
            <div>
                <form className='kitform' onSubmit={ handleSubmit }>
                    <p>Select Tea</p>
                    <select className='kitoption' value={ teaName } name='teaName' onChange={ handleChange }>
                        <option value=''>Tea Options</option>
                        {
                            teas.map(tea => {
                                return (
                                    <option key={tea.id}>
                                        {tea.name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <p>Select Syrup</p>
                    <select className='kitoption' value={ syrupName } name='syrupName' onChange={ handleChange }>
                        <option value=''>Syrup Options</option>
                        {
                            syrups.map(syrup => {
                                return (
                                    <option key={syrup.id}>
                                        {syrup.name}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button className='addtocart' onClick={() => addProductToCart(product)} disabled={ !syrupName || !teaName}>Add to Cart</button>
                </form>
                <pre>
                    { JSON.stringify(this.state, null, 2)}
                </pre>
            </div>
        )
    }
}

const mapState = ( state, otherProps ) => {
    const teas = state.products.filter((product) => product.key === 'tea')
    const syrups = state.products.filter((product) => product.key === 'syrup')
    const product = state.products.find(
        (product) => product.id === otherProps.match.params.id * 1
      ) || {};
    return {
        teas,
        syrups,
        product
    }
}

const mapDispatch = dispatch => {
    return {
        addToCart: (product, quantity) =>
            dispatch(addToCart(product, quantity, history)),
    }  
}

export default connect(mapState, mapDispatch)(Kit)