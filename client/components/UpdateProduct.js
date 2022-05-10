import React from 'react'
import {connect} from 'react-redux'
import { updateProduct } from '../store'

export class UpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        const {product} = this.props
    this.state = {
        name: product ? product.name : '',
        imageUrl: product ? product.imageUrl : '',
        price: product ? product. price : 0,
        description: product ? product.description : '',
        key: product ? product.key : '',
        quantity: product ? product.quantity : 0
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
        this.props.updateProduct(this.props.product.id, {...this.state})
        this.props.history.push(`/products/${this.props.product.id}`)
    }
    render() {
       const { name, price, description, imageUrl, key, quantity } = this.state
       const {handleSubmit, handleChange} = this
       const { user } = this.props
       return (
       <div> 
         { user.isAdmin ? (
            <div> 
              <div> ADMIN ONLY </div>  
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
                  value={description || ''}
                  placeholder='Product Description'
                  onChange={handleChange}
                />
                <input 
                  name='imageUrl'
                  type='text'
                  value={imageUrl || ''}
                  placeholder='Product ImageUrl'
                  onChange={handleChange}
                />
                <select
                  name='key'
                  value={key || ''}
                  placeholder='Product Category'
                  onChange={handleChange}
                >
                <option value=''> Select a Category</option>
                <option value='tea'>Tea</option>
                <option value='topping'>Topping</option>
                <option value='merchandise'>Merchandise</option>
                <option value='milk'>Milk Powder</option>
                <option value='syrup'>Syrup</option>
                
                </select>
                <input 
                 name='quantity'
                 type='number'
                 value={quantity || ''}
                 placeholder='Product Quantity'
                 onChange={handleChange}
                 />
                </div>  
                <button onClick={handleSubmit}> Update Product</button> 
             </form> 
            </div> 
         ) : null }  
       </div>
       )
    }
}

const mapState = (state, otherProps) => {
const id = otherProps.match.params.id
  return {
      product: state.products.find(product => product.id === id * 1 ),
      user: state.auth
  }
}

const mapDispatch = dispatch => {
    return {
        updateProduct: (productId, product) => dispatch(updateProduct(productId, product))
    }
}

export default connect(mapState, mapDispatch)(UpdateProduct)