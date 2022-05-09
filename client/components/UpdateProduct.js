import React from 'react'
import {connect} from 'react-redux'
import { updateProduct } from '../store'

export class UpdateProduct extends React.Component {
    constructor() {
        super()
    this.state = {
        name: '',
        imageUrl: '',
        price: 0,
        description: '',
        key: 'toppings',
        quantity: 0
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidUpdate(prevProps) {
      if(this.props.product !== prevProps.product) {
          this.setState({
              name: this.props.product.name,
              imageUrl: this.props.product.imageUrl,
              price: this.props.product.price,
              description: this.props.product.description,
              key: this.props.product.key,
              quantity: this.props.product.quantity
          })
        }
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(evt) {
        evt.preventDefault()
        this.props.updateProduct(this.props.product.id, this.state)
        this.props.history.push(`/products/${this.props.product.id}`)
    }
    render() {
       const { name, price, description, imageUrl, key } = this.state
       const {handleSubmit, handleChange} = this
       const { user } = this.props
       return (
       <div> 
         { user.isAdmin ? (
            <div> 
              <form onSubmit={handleSubmit}
              >
              <div>
                <input
                  name='name'
                  type='text'
                  value={name || ''}
                  placeholder='Product Name'
                  onChange={handleChange}
                />  
                <input
                  name='price'
                  type='number'
                  value={price || ''}
                  placeholder='Product Price'
                  onChange={handleChange}
                />
                <input
                  name='description'
                  type='text'
                  value={imageUrl || ''}
                  placeholder='Product ImageUrl'
                  onChange={handleChange}
                />
                <input
                  name='key'
                  type='text'
                  value={key || ''}
                  placeholder='Product Category'
                  onChange={handleChange}
                />
              </div>    
             </form> 
            </div> 
         ) : null}  
       </div>
       )
    }
}

const mapState = state => {
  return {
      product: state.product,
      user: state.auth
  }
}

const mapDispatch = dispatch => {
    return {
        updateProduct: (productId, product) => dispatch(updateProduct(productId, product))
    }
}

export default connect(mapState, mapDispatch)(UpdateProduct)